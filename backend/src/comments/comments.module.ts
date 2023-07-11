import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { PostService } from 'src/posts/services/post.service';
import { CommentLikesService } from './comment-likes.service';
import { CommentsService } from './comments.service';

@Module({
	controllers: [CommentsController],
	providers: [PostService, CommentLikesService, CommentsService]
})
export class CommentsModule {}
