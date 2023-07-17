import {
	Body,
	Controller,
	Get,
	Post,
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

import { UserService } from 'src/users/services/user.service';
import { PostPhotoService } from './services/post-photo.service';
import { Base, DetaService } from 'src/deta/deta.service';

import { GetAllDto, PostCreationDetails } from './dto';
import { limitArray as limitPosts } from 'src/utils';
import { ObjectType } from 'deta/dist/types/types/basic';
import { Post as PostType } from './types';

import { ParseLimOffPipe } from './get-all-dto.pipe';
import { PostExistsPipe } from './post-exists.pipe';

import { CurrentUserId } from 'src/users/user.decorator';
import * as dayjs from 'dayjs';
import { randomUUID } from 'crypto';
import { OptionalParseIntPipe } from 'src/users/pipes/optional-parse-int.pipe';

@Controller('post')
export class PostController {
	postsBase: Base;
	constructor(
		private user: UserService,
		private postPhoto: PostPhotoService,
		private config: ConfigService,
		private deta: DetaService
	) {
		const d = this.deta;
		this.postsBase = d.createBase("posts"); 
	}

	@Post('create')
	@UseInterceptors(FileInterceptor('photo'))
	async createPost(
		@Body() postDetails: PostCreationDetails,
		@CurrentUserId() id: string,
		@UploadedFile() file: Express.Multer.File
	) {
		const postId = randomUUID();
		const uploadPostProm = this.postsBase.put(
			{
				caption: postDetails.caption,
				userId: id,
				likes: 0,
				dislikes: 0,
				hasPhoto: !isUndefined(file),
				createdAt: new Date().toISOString()
			},
			postId
		);
		const uploadPhotoProm = this.postPhoto.uploadPhoto(postId, id, file);
		const [post, _b] = await Promise.all([uploadPostProm, uploadPhotoProm]);
		return post;
	}

	@Get()
	async getPost(@Query('id') id: string, @Req() req: Request) {
		let post = await this.postsBase.get(id);
		if (!post) {
			throw new NotFoundException('Post not found');
		}
		const host = this.config.get('BACKEND_HOST');
		if (post.hasPhoto) {
			post = Object.assign(post, {
				photo: `${req.protocol}://${host}/post/photo?id=${id}`
			});
		}
		return post;
	}

	@Put('update')
	async updatePost(
		@Query('id', PostExistsPipe) id: string,
		@Body() body: PostCreationDetails
	) {
		return await this.postsBase.update(body as unknown as ObjectType, id);
	}

	@Delete('delete')
	async deletePost(
		@Query('id', PostExistsPipe) id: string,
		@CurrentUserId() currentId: string
	) {
		const prom1 = this.postsBase.delete(id);
		const prom2 = this.postPhoto.deletePhoto(id, currentId);
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

	@Get('fetch')
	async fetchPosts(
		@Query('limit', new OptionalParseIntPipe({ defaultValue: 15 })) limit: number,
		@Query('offset', new OptionalParseIntPipe({ defaultValue: 0 })) offset: number
	){
		return limitPosts((await this.postsBase.fetch()).items.sort((a, b) => {
			return dayjs(a.createdAt as string).isAfter(b.createdAt as string) ? -1 : 1;
		}), limit, offset);
	}

	@Get('photo')
	async getPhoto(@Query('id') id: string) {
		return await this.postPhoto.getPhoto(id);
	}
}
