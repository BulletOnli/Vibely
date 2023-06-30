import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	Delete,
	Req,
	NotFoundException,
	Query,
	Put,
	UseInterceptors,
	UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { DetaClass } from 'src/deta.class';

import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from 'src/users/services/user.service';
import { PostService } from './post.service';
import { PostPhotoService } from './post-photo.service';

import { GetAllDto, PostCreationDetails } from './dto';
import { ObjectType } from 'deta/dist/types/types/basic';
import { Post as PostType } from './types';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController extends DetaClass {
	constructor(
		private user: UserService, 
		private post: PostService, 
		private postPhoto: PostPhotoService,
		private config: ConfigService
	) {
		super();
	}

	@Post('create')
	@UseInterceptors(FileInterceptor("photo"))
	async createPost(
		@Body() postDetails: PostCreationDetails,
		@Req() req: Request,
		@UploadedFile() file: Express.Multer.File
	) {
		const id = req['user'].sub;
		const postId = await this.post.autoIncKey();
		const uploadPostProm = this.postsBase.put(
			{
				caption: postDetails.caption,
				userId: id,
				likes: 0,
				dislikes: 0,
				hasPhoto: file !== undefined
			},
			postId
		);
		const uploadPhotoProm = this.postPhoto.uploadPhoto(postId, req, file);
		await Promise.all([uploadPostProm, uploadPhotoProm]);
	}

	@Get()
	async getPost(@Query('id') id: number, @Req() req: Request) {
		let post = await this.postsBase.get(id.toString());
		if (!post) {
			throw new NotFoundException('Post not found');
		}
		const host = this.config.get("HOST");
		if (post.hasPhoto) {
			post = Object.assign(post, { photo: `${req.protocol}://${host}/post/photo?id=${id}` });
		}
		return post;
	}

	@Put('update')
	async updatePost(@Query('id') id: number, @Body() body: PostCreationDetails) {
		await this.postsBase.update(body as unknown as ObjectType, id.toString());
	}

	@Delete('delete')
	async deletePost(@Query('id') id, @Req() req: Request) {
		const prom1 = this.postsBase.delete(id);
		const prom2 = this.postPhoto.deletePhoto(id, req);
		await Promise.all([prom1, prom2]);
	}

	@Get('all')
	async getAllFromUserId(
		@Query() { id, limit = '15', offset = '0' }: GetAllDto
	) {
		const user = await this.user.findOneById(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		const posts = await this.postsBase.fetch();
		const filtered = posts.items.filter(
			x => x.userId === user.key
		) as PostType[];

		return this.post.limit(filtered, parseInt(limit), parseInt(offset));
	}

	@Get("photo")
	async getPhoto(@Query('id') id, @Req() req: Request){
		return await this.postPhoto.getPhoto(id, req);
	}
}
