import { 
	Controller, 
	UseGuards, 
	Post, 
	Query, 
	Req,
	BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { Request } from 'express';
import { DetaClass } from 'src/deta.class';
import { AuthGuard } from 'src/guards/auth.guard';
import { PostService } from './post.service';

@UseGuards(AuthGuard)
@Controller("post/likes")
export class PostLikesController extends DetaClass {
	constructor(private post: PostService){
		super();
	}

	@Post("like")
	async likePost(@Query("id") postId: number, @Req() req: Request){
		const userId = req['user'].sub;
		const likes = this.likesBase;
		const items = (await likes.fetch()).items as unknown as Like[];

		const like = items.find((x: Like) => x.postId === postId && x.userId === userId);

		if (!(await this.post.exists(postId))) {
			throw new NotFoundException("Post not found")
		} else if (!like) {
			await likes.put({
				isLiked: true,
				isDisliked: false,
				postId,
				userId
			});
		} else if (!like?.isLiked) {
			await likes.update({
				isLiked: true,
				isDisliked: false
			}, like.key);
		} else {
			throw new BadRequestException("Already liked this post");
		}
	}

	@Post("unlike")
	async unlikePost(@Query("id") postId: number, @Req() req: Request){
		const userId = req['user'].sub;
		const likes = this.likesBase;
		const items = (await likes.fetch()).items as unknown as Like[];

		const like: Like = items.find((x: Like) =>
			x.postId === postId &&
			x.userId === userId
		);

		if (!(await this.post.exists(postId))) {
			throw new NotFoundException("Post not found");
		} else if (like && like.isLiked) {
			await likes.update({
				isLiked: false,
				isDisliked: false
			}, like.key);
		} else {
			throw new BadRequestException("Already unliked this post");
		}
	}
}
