import {
	Controller,
	Post,
	Body,
	Get,
	HttpCode,
	HttpStatus
} from '@nestjs/common';
import { UserRegistrationDetails, UserLoginDetails } from './dto';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private auth: AuthService, private user: UserService) {}

	@Post('login')
	loginUser(@Body() { password, username }: UserLoginDetails) {
		return this.auth.logIn(username, password);
	}

	@Post('register')
	async registerUser(@Body() register: UserRegistrationDetails) {
		await this.user.registerUser(register);
	}
}
