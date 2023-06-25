import {
	Controller,
	Post,
	Body,
	BadRequestException,
	NotFoundException
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserRegistrationDetails, UserLoginDetails } from './dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
	constructor(
		private user: UserService,
		private jwtService: JwtService
	) {}

	@Post('login')
	async loginUser(@Body() { password, username }: UserLoginDetails) {
		const user = await this.user.findOne(username);
		if (!user) {
			throw new NotFoundException();
		} else if (!(await argon2.verify((user.password as string), password))) {
			throw new BadRequestException('wrong password');
		}
		return {
			accessToken: await this.jwtService.signAsync({ username, sub: user.key })
		};
	}

	@Post('register')
	async registerUser(@Body() register: UserRegistrationDetails) {
		await this.user.registerUser(register);
	}
}
