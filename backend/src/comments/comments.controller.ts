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
import { CurrentUserId, QueryId } from 'src/decorators';
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
		@QueryId(PostExistsPipe) postId: string,
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
		@QueryId(CommentExistsPipe) commentId: string,
	) {
		const likesProm = this.commentLikesBase.fetch({ commentId, userId: currentId });
		const comm = this.commentsBase.get(commentId);
		const [likes, com] = await Promise.all([likesProm, comm]);
		if (com) {
			const deleteProm = this.commentsBase.delete(commentId);
			Promise.all([this.likes.deleteMany(likes), deleteProm]);
		}
	}

	@Post('like')
	async likeComment(
		@CurrentUserId() currentId: string,
		@QueryId(CommentExistsPipe) commentId: string,
	) {
		const item = (await this.commentLikesBase.fetch({ commentId, userId: currentId })).items[0];
		if (isEmpty(item)) {
			let prom1 = this.updateCommentLikes(commentId, true)
			let prom2 = this.commentLikesBase.put({
				isLiked: true,
				commentId,
				userId: currentId,
			});
			const [, toReturn] = await Promise.all([prom1, prom2]);
			return toReturn;

		} else if (!item.isLiked) {
			let prom1 = this.updateCommentLikes(commentId, true)
			let prom2 = this.commentLikesBase.update(
				{ isLiked: true },
				item.key.toString()
			);
			await Promise.all([prom1, prom2]);
			return {
				isLiked: true,
				commentId,
				userId: currentId,
			}
		} else {
			throw new BadRequestException('Already liked this comment');
		}
	}

	private async updateCommentLikes(cid: string, isLike: boolean){
		const { likes, key } = await this.commentsBase.get(cid);
		let comLikes = likes as number;
		comLikes += isLike ? 1 : (!comLikes ? 0 : -1);
		console.log(comLikes)
		await this.commentsBase.update({ likes: comLikes }, key.toString());
	}

	@Post('unlike')
	async unlikeComment(
		@CurrentUserId() userId: string,
		@QueryId(CommentExistsPipe) commentId: string,
	) {
		const item = (await this.commentLikesBase.fetch({ commentId, userId })).items[0];
		if (!isEmpty(item) && item.isLiked) {
			let prom1 = this.updateCommentLikes(commentId, false);
			let prom2 = this.commentLikesBase.update(
				{ isLiked: false },
				item.key.toString()
			);
			await Promise.all([prom2, prom1])
		} else {
			throw new BadRequestException('Already unliked this comment');
		}
	}

	@Get("fetch")
	async getComments(@Query('postId', PostExistsPipe) postId: string){
		return (await this.commentsBase.fetch({ postId })).items;
	}

	@Get("getlikestate")
	async getLikeState(
		@CurrentUserId() id: string, 
		@QueryId() cid: string
	){
		this.cidOrError(cid);
		const like = (await this.commentLikesBase.fetch({ userId: id, commentId: cid })).items;
		if (!like.length) {
			return {
				isLiked: false
			};
		} else {
			return {
				isLiked: like.at(0).isLiked
			};
		}
	}

	@Get("getlikescount")
	async getLikesCount(@QueryId() cid: string){
		this.cidOrError(cid);
		const { likes } = await this.commentsBase.get(cid);
		return { likes };
	}

	private cidOrError(cid: string){
		if (!cid) {
			throw new BadRequestException("Comment id is required");
		}
	}
}
