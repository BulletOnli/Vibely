import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { ProfileController } from "./profile.controller";
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Module({
	controllers: [
		UserController,
		ProfileController
	],
	providers: [
		AuthService,
		UserService,
		AuthGuard
	]
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