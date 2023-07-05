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
import { isUndefined } from 'lodash';

import { DetaClass } from 'src/deta.class';
import { AuthGuard } from 'src/guards/auth.guard';

import { UserService } from 'src/users/services/user.service';
import { PostService } from './post.service';
import { PostPhotoService } from './post-photo.service';

import { GetAllDto, PostCreationDetails } from './dto';
import { limitArray as limitPosts } from 'src/utils';
import { ObjectType } from 'deta/dist/types/types/basic';
import { Post as PostType } from './types';

import { ParseLimOffPipe } from './get-all-dto.pipe';
import { PostExistsPipe } from './post-exists.pipe';

import { CurrentUserId } from 'src/users/user.decorator';

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
	@UseInterceptors(FileInterceptor('photo'))
	async createPost(
		@Body() postDetails: PostCreationDetails,
		@CurrentUserId() id: string,
		@UploadedFile() file: Express.Multer.File
	) {
		const postId = await this.post.autoIncKey();
		const uploadPostProm = this.postsBase.put(
			{
				caption: postDetails.caption,
				userId: id,
				likes: 0,
				dislikes: 0,
				hasPhoto: !isUndefined(file)
			},
			postId
		);
		const uploadPhotoProm = this.postPhoto.uploadPhoto(postId, id, file);
		await Promise.all([uploadPostProm, uploadPhotoProm]);
	}

	@Get()
	async getPost(@Query('id') id: string, @Req() req: Request) {
		let post = await this.postsBase.get(id);
		if (!post) {
			throw new NotFoundException('Post not found');
		}
		const host = this.config.get('HOST');
		if (post.hasPhoto) {
			post = Object.assign(post, {
				photo: `${req.protocol}://${host}/post/photo?id=${id}`
			});
		}
		return post;
	}

	@Put('update')
	async updatePost(@Query('id', PostExistsPipe) id: string, @Body() body: PostCreationDetails) {
		await this.postsBase.update(body as unknown as ObjectType, id);
	}

	@Delete('delete')
	async deletePost(@Query('id', PostExistsPipe) id: string, @Req() req: Request) {
		const prom1 = this.postsBase.delete(id);
		const prom2 = this.postPhoto.deletePhoto(id, req);
		await Promise.all([prom1, prom2]);
	}

	@Get('all')
	async getAllFromUserId(
		@Query(ParseLimOffPipe) { id, limit, offset }: GetAllDto
	) {
		const user = await this.user.findOneById(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		const posts = await this.postsBase.fetch({ userId: user.key } as PostType);

		return limitPosts(posts.items, limit, offset);
	}

	@Get('photo')
	async getPhoto(@Query('id') id: string, @Req() req: Request) {
		return await this.postPhoto.getPhoto(id, req);
	}
}
