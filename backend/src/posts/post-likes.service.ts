import { 
	Injectable,
	NotFoundException,
	BadRequestException
} from '@nestjs/common';
import { Base } from 'deta'; 
import { Request } from 'express'; 
import { DetaClass } from 'src/deta.class';
import { PostService } from './post.service';

@Injectable()
export class PostLikesService extends DetaClass {
	constructor(private post: PostService){
		super();
	}
	
	async applyLikeDislike(postId: number, req: Request, isLike: boolean){
		const [like, likes] = await this.getLike(postId, req);

		if (!(await this.post.exists(postId))) {
			throw new NotFoundException("Post not found")
		} else if (!like) {
			await likes.put({
				isLiked: isLike,
				postId,
				userId: req['user'].sub
			});
		}	else {
			await likes.update({
				isLiked: isLike,
			}, like.key);
		}	
	}

	async removeLikeDislike(postId: number, req: Request){
		const [like, likes] = await this.getLike(postId, req);

		if (!(await this.post.exists(postId))) {
			throw new NotFoundException("Post not found");
		} else {
			await likes.update({
				isLiked: null,
			}, like.key);
		}
	}

	private async getLike(postId: number, req: Request): Promise<[Like | undefined, ReturnType<typeof Base>]> {
		const userId = req['user'].sub;
		const likes = this.likesBase;
		const items = (await likes.fetch()).items as unknown as Like[];
		return [
			items.find((x: Like) =>
				x.postId === postId &&
				x.userId === userId
			),
			likes
		];
	}
}
