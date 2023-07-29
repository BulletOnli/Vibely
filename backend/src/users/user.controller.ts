import {
	Controller,
	Post,
	Body,
	BadRequestException,
	Get,
	Query,
  HttpStatus
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { omit } from 'lodash';
import { UserRegistrationDetails, UserLoginDetails } from './dto';
import { UserService } from './services/user.service';
import { JwtService } from '@nestjs/jwt';
import { CurrentUserId, QueryId } from 'src/decorators';
import { DetaService, Model } from 'src/deta';
import { User } from 'src/models';
import { Observable } from 'rxjs';
import { throwHttpError } from 'src/operators';

type AccessToken = {
	accessToken: string;
}

@Controller('user')
export class UserController {
	user: Model<User>
	constructor(
		private userService: UserService, 
		private jwtService: JwtService,
		private deta: DetaService
	){
		this.user = this.deta.createModel<User>("users");
	}

	@Post('login')
	async loginUser(@Body() { password, username }: UserLoginDetails) {
		return new Observable<AccessToken>(subscriber => {		
			this.user.get({ username }).subscribe({
				error(err) {
				  subscriber.error({ 
				  	status: HttpStatus.NOT_FOUND, 
				  	message: "User " + (err as string).toLowerCase() 
				  });
				},
				next: (val) => {
					argon2.verify(val.password as string, password).then(bool => {
						if (!bool) {
							subscriber.error({ status: HttpStatus.BAD_REQUEST, message: "Wrong password" } as HttpError);
						} else {					
							subscriber.next({
								accessToken: this.jwtService.sign({ username: val.username, sub: val.key })
							});
							subscriber.complete();
						}
					})
				}
			});
		}).pipe(throwHttpError());
	}

	@Post('register')
	async registerUser(@Body() register: UserRegistrationDetails) {
		return new Observable<AccessToken>(subscriber => {
			this.user.get({ username: register.username }).subscribe({
				error: () => {
					this.userService.registerUser(register).then(({ username, key }) => {
						this.jwtService.signAsync({ username, sub: key }).then(accessToken => {
							subscriber.next({ accessToken });
						});
						subscriber.complete();
					}).catch(err => {
						const { statusCode, message } = err.response;
						subscriber.error({ status: statusCode, message });
					});
				},
				next() {
				  subscriber.error({ status: HttpStatus.BAD_REQUEST, message: "Username exists" } as HttpError)
				},
			});
		}).pipe(throwHttpError());
	}

	@Get('current')
	async getCurrentUserInfo(@CurrentUserId() id: string) {
		return await this._getUserInfo(id);
	}

	@Get()
	async getUserInfo(@Query('username') un: string, @QueryId() id: string) {
		if (un && id) {
			throw new BadRequestException('Cannot use both username and id');
		} else if (un) {
			return await this._getUserInfoByUsername(un);
		} else if (id) {
			return await this._getUserInfo(id);
		} else {
			throw new BadRequestException('Id or username is required');
		}
	}

	private async _getUserInfo(id: string) {
		return this.omitSensitive(await this.userService.findOneById(id));
	}
	private async _getUserInfoByUsername(username: string) {
		return this.omitSensitive(await this.userService.findOne(username));
	}

	private omitSensitive(obj: object) {
		return omit(obj, ['actualPassword', 'password']);
	}
}
