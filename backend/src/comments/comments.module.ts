import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { PostService } from 'src/posts/services/post.service';

@Module({
	controllers: [CommentsController],
	providers: [PostService]
})
export class CommentsModule {}
