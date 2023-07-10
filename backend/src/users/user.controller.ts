import {
	Controller,
	Post,
	Body,
	BadRequestException,
	NotFoundException,
	Get,
	UseGuards,
	Query
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { omit } from 'lodash';
import { UserRegistrationDetails, UserLoginDetails } from './dto';
import { UserService } from './services/user.service';
import { JwtService } from '@nestjs/jwt';
import { CurrentUserId } from './user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
	constructor(private user: UserService, private jwtService: JwtService) {}

	@Post('login')
	async loginUser(@Body() { password, username }: UserLoginDetails) {
		const user = await this.user.findOne(username);
		if (!user) {
			throw new NotFoundException('User not found');
		} else if (!(await argon2.verify(user.password as string, password))) {
			throw new BadRequestException('wrong password');
		}
		return {
			accessToken: await this.jwtService.signAsync({ username, sub: user.key })
		};
	}

	@Post('register')
	async registerUser(@Body() register: UserRegistrationDetails) {
		const { username, key } = await this.user.registerUser(register);
		return {
			accessToken: await this.jwtService.signAsync({ username, sub: key })
		};
	}

	@UseGuards(AuthGuard)
	@Get('current')
	async getCurrentUserInfo(@CurrentUserId() id: string) {
		return await this._getUserInfo(id);
	}

	@UseGuards(AuthGuard)
	@Get()
	async getUserInfo(@Query('username') un: string) {
		return await this._getUserInfoByUsername(un);
	}

	private async _getUserInfo(id: string) {
		return this.omitSensitiveAndKey(await this.user.findOneById(id));
	}
	private async _getUserInfoByUsername(username: string) {
		return this.omitSensitiveAndKey(await this.user.findOne(username));
	}

	private omitSensitiveAndKey(obj: object) {
		return omit(obj, ['actualPassword', 'password', 'key']);
	}
}
