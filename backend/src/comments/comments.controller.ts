import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Query
} from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { isEmpty } from 'lodash';
import { PostExistsPipe } from 'src/posts/post-exists.pipe';
import { CurrentUserId } from 'src/users/user.decorator';
import { CommentLikesService } from './comment-likes.service';
import { CommentExistsPipe } from './comment-exists.pipe';
import { Base, DetaService } from 'src/deta/deta.service';

class TextDto {
	@IsNotEmpty()
	@IsString()
	text: string;
}

@Controller('comment')
export class CommentsController {
	commentsBase: Base;
	commentLikesBase: Base;
	constructor(
		private likes: CommentLikesService,
		private deta: DetaService
	) {
		const d = this.deta;
		this.commentsBase = d.createBase("comments");
		this.commentLikesBase = d.createBase("commentLikes");
	}

	@Post('add')
	async addComment(
		@CurrentUserId() currentId: string,
		@Query('id', PostExistsPipe) postId: string,
		@Body() { text }: TextDto
	) {
		return await this.commentsBase.put({
			text,
			likes: 0,
			postId,
			userId: currentId
		});
	}

	@Delete('delete')
	async deleteComment(
		@CurrentUserId() currentId: string,
		@Query('id', CommentExistsPipe) commentId: string,
		@Query('postId', PostExistsPipe) postId: string
		) {
			const likesProm = this.commentLikesBase.fetch({ commentId, userId: currentId, postId });
		const comm = this.commentsBase.fetch({ userId: currentId, postId });
		const [likes, com] = await Promise.all([likesProm, comm]);
		if (com.count !== 0) {
			const deleteProm = this.commentsBase.delete(commentId);
			Promise.all([this.likes.deleteMany(likes)]);
		}
	}

	@Post('like')
	async likeComment(
		@CurrentUserId() currentId: string,
		@Query('id', CommentExistsPipe) commentId: string,
		@Query('postId', PostExistsPipe) postId: string
	) {
		const item = (await this.commentLikesBase.fetch({ commentId, postId })).items[0];
		if (isEmpty(item)) {
			return await this.commentLikesBase.put({
				isLiked: true,
				commentId,
				userId: currentId,
				postId
			});
		} else if (!item.isLiked) {
			await this.commentLikesBase.update(
				{ isLiked: true },
				item.key.toString()
			);
		} else {
			throw new BadRequestException('Already liked this comment');
		}
	}

	@Post('unlike')
	async unlikeComment(
		@CurrentUserId() currentId: string,
		@Query('id', CommentExistsPipe) commentId: string
	) {
		const item = (await this.commentLikesBase.fetch({ commentId })).items[0];
		if (!isEmpty(item) && item.isLiked) {
			return await this.commentLikesBase.update(
				{ isLiked: false },
				item.key.toString()
			);
		} else {
			throw new BadRequestException('Already unliked this comment');
		}
	}

	@Get("fetch")
	async getComments(@Query('postId', PostExistsPipe) postId: string){
		return (await this.commentsBase.fetch({ postId })).items;
	}
}
