import {
	Injectable,
	BadRequestException,
	NotFoundException
} from '@nestjs/common';
import { Base } from 'deta';
import { Request } from 'express';
import { DetaClass } from 'src/deta.class';
import { PostService } from './post.service';
import { Post } from '../types';

@Injectable()
export class PostLikesService extends DetaClass {
	constructor(private post: PostService) {
		super();
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
			const prom2 = this.updatePostLikes(post, isLike);

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
			const prom2 = this.updatePostLikes(post, isLike);
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
				const prom2 = this.updatePostLikes(post, isLike, true);
				Promise.all([prom, prom2]);
			} else {
				throw new BadRequestException(
					`Already un${isLike ? 'like' : 'dislike'}d this post.`
				);
			}
		}
	}

	private updatePostLikes(post: Post, isLike: boolean, removeLike = false) {
		let likes = post.likes;
		let dislikes = post.dislikes;
		const a = dislikes === 0 ? 0 : 1;
		const b = likes === 0 ? 0 : 1;
		if (!removeLike) {
			if (isLike) {
				likes += 1;
				dislikes -= a;
			} else {
				dislikes += 1;
				likes -= b;
			}
		} else {
			if (isLike) {
				likes -= b;
			} else {
				dislikes -= a;
			}
		}
		return this.postsBase.update(
			{
				likes,
				dislikes
			},
			post.key as string
		);
	}

	private getLikesAndPost(postId: number, req: Request) {
		const getLike = this.getLike(postId, req);
		const findOneProm = this.post.findOne(postId);
		return Promise.all([getLike, findOneProm]);
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
