import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) {}
	async logIn(username: string, password: string) {
		const user = await this.userService.findOne(username);
		if (!user) {
			throw new NotFoundException();
		} else if (!(await argon2.verify((user.password as string), password))) {
			throw new BadRequestException('wrong password');
		}
		return {
			accessToken: await this.jwtService.signAsync({ username, sub: user.key })
		};
	}
}
