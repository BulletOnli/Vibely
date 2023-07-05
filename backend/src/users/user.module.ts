import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { UserController } from './user.controller';
import { ProfileController } from './profile.controller';
import { UserFriendsController } from './user-friends.controller';
import { CoverController } from './cover.contoller';

import { UserService } from './services/user.service';
import { PhotoService } from './services/photo.service';
import { FriendsService } from './services/friends.service';
import { AuthGuard } from '../guards/auth.guard';

@Module({
	imports: [MulterModule],
	controllers: [
		UserController,
		ProfileController,
		UserFriendsController,
		CoverController
	],
	providers: [UserService, AuthGuard, PhotoService, FriendsService]
})
export class UserModule {}

/*

Routes:

/user/login POST
/user/register POST
/user/profile/{id} need id otherwise 400
/user/profile/pic/{id}
/user/friends
/user/friends/add?id=id
/user/profile/

*/
