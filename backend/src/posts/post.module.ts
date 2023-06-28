import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostLikesController } from './post-likes.controller';
import { PostService } from './post.service';
import { UserService } from 'src/users/user.service';
import { PostLikesService } from './post-likes.service';

@Module({
	controllers: [PostController, PostLikesController],
	providers: [UserService, PostService, PostLikesService]
})
export class PostModule {}
