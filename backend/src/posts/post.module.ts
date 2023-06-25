import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostLikesController } from './post-likes.controller';
import { PostService } from './post.service';
import { UserService } from 'src/users/user.service';

@Module({
	controllers: [
		PostController,
		PostLikesController
	],
	providers: [UserService, PostService]
})
export class PostModule {

}
