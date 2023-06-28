import {
	Injectable,
	BadRequestException,
	NotFoundException
} from '@nestjs/common';
import { Base } from 'deta';
import { Request } from 'express';
import { DetaClass } from 'src/deta.class';
import { PostService } from './post.service';
import { Post } from './types';

@Injectable()
export class PostLikesService extends DetaClass {
	constructor(private post: PostService) {
		super();
	}

	private updatePostLikes(post: Post, incOrDec: 'inc' | 'dec') {
		return this.postsBase.update(
			{
				likes: post.likes + (incOrDec === 'inc' ? 1 : -1)
			},
			post.key
		);
	}

	private getLikesAndPost(postId: number, req: Request) {
		const getLike = this.getLike(postId, req);
		const findOneProm = this.post.findOne(postId);
		return Promise.all([getLike, findOneProm]);
	}

	async applyLikeDislike(postId: number, req: Request, isLike: boolean) {
		const [[like, likes], post] = await this.getLikesAndPost(postId, req);

		if (!post) {
			throw new NotFoundException('Post not found');
		} else if (!like) {
			const prom = likes.put({
				isLiked: isLike,
				postId,
				userId: req['user'].sub
			});
			const prom2 = this.updatePostLikes(post, 'inc');

			// https://medium.com/@dinesh_kumar/how-i-ran-two-tasks-in-parallel-using-node-js-5cf8307bddac
			Promise.all([prom, prom2]);
		} else if (isLike ? like.isLiked : !like.isLiked) {
			throw new BadRequestException(
				`Already ${isLike ? 'like' : 'dislike'}d this post.`
			);
		} else {
			const prom1 = likes.update(
				{
					isLiked: isLike
				},
				like.key
			);
			const prom2 = this.updatePostLikes(post, 'inc');
			Promise.all([prom1, prom2]);
		}
	}

	async removeLikeDislike(postId: number, req: Request, isLike: boolean) {
		const [[like, likes], post] = await this.getLikesAndPost(postId, req);

		if (!(await this.post.exists(postId))) {
			throw new NotFoundException('Post not found');
		} else {
			if (like.isLiked || like.isLiked !== null) {
				const prom = likes.update(
					{
						isLiked: null
					},
					like.key
				);
				const prom2 = this.updatePostLikes(post, 'dec');
				Promise.all([prom, prom2]);
			} else {
				throw new BadRequestException(
					`Already un${isLike ? 'like' : 'dislike'}d this post.`
				);
			}
		}
	}

	private async getLike(
		postId: number,
		req: Request
	): Promise<[Like | undefined, ReturnType<typeof Base>]> {
		const userId = req['user'].sub;
		const likes = this.likesBase;
		const items = (await likes.fetch()).items as unknown as Like[];
		return [
			items.find((x: Like) => x.postId === postId && x.userId === userId),
			likes
		];
	}
}
