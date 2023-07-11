import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { PostController } from './post.controller';
import { PostLikesController } from './post-likes.controller';

import { PostService } from './services/post.service';
import { UserService } from 'src/users/services/user.service';
import { PostLikesService } from './services/post-likes.service';
import { PostPhotoService } from './services/post-photo.service';

@Module({
	imports: [MulterModule],
	controllers: [PostController, PostLikesController],
	providers: [UserService, PostService, PostLikesService, PostPhotoService]
})
export class PostModule {}
