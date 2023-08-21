import {
	Body,
	Controller,
	Get,
	Post as PostReq,
	Delete,
	Req,
	NotFoundException,
	Query,
	Put,
	UseInterceptors,
	UploadedFile,
	StreamableFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { isUndefined } from 'lodash';

import { UserService } from 'src/users/services/user.service';
import { Base, DetaService } from 'src/deta/deta.service';

import { GetAllDto, PostCreationDetails } from './dto';

import { ParseLimOffPipe } from './get-all-dto.pipe';
import { OptionalParseIntPipe } from 'src/users/pipes/optional-parse-int.pipe';

import { CurrentUserId, QueryId } from 'src/decorators';
import * as dayjs from 'dayjs';
import { Model } from 'src/deta/model';
import { Post } from 'src/models';
import { Observable, tap, toArray } from 'rxjs';
import { getItems, limitOffset, sort, throwHttpError } from 'src/operators';
import { Storage } from 'src/deta';

@Controller('post')
export class PostController {
	postsBase: Base;
	post: Model<Post>;
	postPhotos: Storage;

	constructor(
		private user: UserService,
		private config: ConfigService,
		private deta: DetaService
	) {
		const d = this.deta;
		this.postsBase = d.createBase("posts");
		this.post = this.deta.createModel<Post>("posts");
		this.postPhotos = this.deta.createStorage("postPhotos");
	}

	@PostReq('create')
	@UseInterceptors(FileInterceptor('photo'))
	async createPost(
		@Body() { caption }: PostCreationDetails,
		@CurrentUserId() id: string,
		@UploadedFile() file: Express.Multer.File
	) {
		return this.post.put({
			caption,
			userId: id,
			likes: 0,
			dislikes: 0,
			hasPhoto: !isUndefined(file),
			createdAt: new Date().toISOString()
		}, true).pipe(
			tap(({ hasPhoto, key }) => {			
				if (hasPhoto) {
					this.postPhotos.upload(`${id}/${key}/${file.originalname}`, file.buffer).subscribe();
				}
			})
		);
	}

	@Get()
	getPost(@QueryId() id: string, @Req() { protocol }: Request) {
		let post = this.post.get({ key: id });
		const host = this.config.get('BACKEND_HOST');
		return post.pipe(
			tap(post => {
				if (!post) {
					throw new NotFoundException('Post not found');
				}
				if (post.hasPhoto) {
					post = Object.assign(post, {
						photo: `${protocol}://${host}/post/photo?id=${id}`
					});
				}
			})
		);
	}

	@Put('update')
	updatePost(
		@QueryId() id: string,
		@Body() body: PostCreationDetails
	) {
		return this.post.update(body, id).pipe(throwHttpError("Post not found"));
	}

	@Delete('delete')
	deletePost(
		@QueryId() id: string,
		@CurrentUserId() currentId: string
	) {
		return this.post.delete({ key: id, userId: currentId }).pipe(throwHttpError("Post not found"));
	}

	@Get('all')
	async getAllFromUserId(
		@Query(ParseLimOffPipe) { id, limit, offset }: GetAllDto
	) {
		const user = await this.user.findOneById(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}

		return this.post.fetch({ userId: user.key as string }).pipe(
			getItems<Post>(),
			limitOffset(limit, offset),
			toArray()
		);
	}

	@Get('fetch')
	fetchPosts(
		@Query('limit', new OptionalParseIntPipe({ defaultValue: 15 })) limit: number,
		@Query('offset', new OptionalParseIntPipe({ defaultValue: 0 })) offset: number
	){
		return this.post.fetch().pipe(
			getItems<Post>(),
			sort((a, b) => {
				return dayjs(a.createdAt as string).isAfter(b.createdAt as string) ? -1 : 1;
			}),
			toArray(),
			limitOffset(limit, offset),
			toArray()
		);
	}

	@Get('photo')
	getPhoto(@QueryId() id: string) {
		const fileObs = this.postPhotos.getFile(list => {
			return list.find(x => {
				return id === x.split('/')[1];
			});
		});
		return new Observable<StreamableFile>(subscriber => {
			fileObs.subscribe(({ data, contentType }) => {
				subscriber.next(new StreamableFile(data, { type: contentType }));
				subscriber.complete();
			});
		});
	}
}
