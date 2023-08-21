import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ObjectType } from 'deta/dist/types/types/basic';
import { UserRegistrationDetails } from '../dto';
import * as argon2 from 'argon2';
import { Base, DetaService } from 'src/deta/deta.service';

@Injectable()
export class UserService {
	usersBase: Base;
	constructor(private deta: DetaService){
		this.usersBase = this.deta.createBase("users");
	}

	async findOne(username: string): Promise<ObjectType> {
		const [user] = (await this.usersBase.fetch({ username })).items;
		return user;
	}

	async findOneById(id: string) {
		return await this.usersBase.get(id);
	}

	async registerUser(user: UserRegistrationDetails) {
		/*if (!isUndefined(await this.findOne(user.username))) {
			throw new BadRequestException('Username exists');
		} else*/ if (user.password !== user.confirmPassword) {
			throw new BadRequestException("Passwords doesn't match.");
		}

		const { firstName, lastName, username, password, birthday, gender } = user;
		return await this.usersBase.put(
			{
				firstName,
				lastName,
				username,
				password: await argon2.hash(password),
				birthday,
				actualPassword: password,
				gender,
				createdAt: new Date().toISOString()
			},
			randomUUID()
		);
	}

	async deleteOne() {
		throw 'Not implemented';
	}
}
