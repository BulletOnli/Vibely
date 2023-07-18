import { Controller, Post, Req, Get, ParseUUIDPipe } from '@nestjs/common';
import { Request } from 'express';
import { PostLikesService } from './services/post-likes.service';
import { CurrentUserId, QueryId } from 'src/decorators';
import { pick } from 'lodash';

@Controller('post/likes')
export class PostLikesController {
	constructor(private postLikes: PostLikesService) {}

	@Post('like')
	async likePost(@QueryId() postId: string, @Req() req: Request) {
		await this.postLikes.applyLikeDislike(postId, req, true);
	}

	@Post('dislike')
	async dislikePost(@QueryId() postId: string, @Req() req: Request) {
		await this.postLikes.applyLikeDislike(postId, req, false);
	}

	@Post('unlike')
	async undislikePost(@QueryId() postId: string, @Req() req: Request) {
		await this.postLikes.removeLikeDislike(postId, req, true);
	}

	@Post('undislike')
	async unlikePost(@QueryId() postId: string, @Req() req: Request) {
		await this.postLikes.removeLikeDislike(postId, req, false);
	}

	@Get("getcount")
	async getPostCount(@QueryId(new ParseUUIDPipe({ version: '4' })) postId: string){
		const posts = this.postLikes.postsBase;
		return pick(await posts.get(postId), ['likes', 'dislikes']);
	}

	@Get("getstate")
	async getLikeState(
		@CurrentUserId() userId: string, 
		@QueryId(new ParseUUIDPipe({ version: '4' })) postId: string
	){
		const likes = this.postLikes.likesBase;
		const like = (await likes.fetch({ postId, userId })).items;
		if (!like.length) {
			return {
				isLiked: null
			};
		} else {
			return pick(like.at(0), ['isLiked']);
		}
	}
}
