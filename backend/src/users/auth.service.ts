import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	){}
	async logIn(username: string, password: string){
		const user = this.userService.findOne(username);
		if (!user) {
			throw new NotFoundException();
		} else if (user.password !== password) {
			throw new UnauthorizedException();
		}
		return {
			accessToken: await this.jwtService.signAsync({ username, sub: user.id })
		};	
	}
}
