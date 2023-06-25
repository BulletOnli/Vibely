import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProfileController } from './profile.controller';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/auth.guard';
import { ChatGateway } from './chat.gateway';

@Module({
	controllers: [UserController, ProfileController],
	providers: [UserService, AuthGuard, ChatGateway]
})
export class UserModule {}

/*

Routes:

/user/login POST
/user/register POST
/user/profile/{id} need id otherwise 400
/user/profile/pic/{id}
/user/friends
/user/profile/

*/
