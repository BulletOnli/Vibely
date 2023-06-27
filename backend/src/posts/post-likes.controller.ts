import { 
	Controller, 
	UseGuards, 
	Post, 
	Query, 
	Req
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { PostLikesService } from './post-likes.service';


@UseGuards(AuthGuard)
@Controller("post/likes")
export class PostLikesController {
	constructor(private postLikes: PostLikesService){}

	@Post("like")
	async likePost(@Query("id") postId: number, @Req() req: Request){
		this.postLikes.applyLikeDislike(postId, req, true);
	}

	@Post("dislike")
	async dislikePost(@Query("id") postId: number, @Req() req: Request){
		this.postLikes.applyLikeDislike(postId, req, false);
	}

	@Post("undislike")
	async undislikePost(@Query("id") postId: number, @Req() req: Request){
		this.postLikes.removeLikeDislike(postId, req);
	}

	@Post("unlike")
	async unlikePost(@Query("id") postId: number, @Req() req: Request){
		this.postLikes.removeLikeDislike(postId, req);
	}
}
