import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Deta, Base } from 'deta';
import { ObjectType } from 'deta/dist/types/types/basic';
import { UserRegistrationDetails } from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
	deta: ReturnType<typeof Deta>;
	userBase: ReturnType<typeof Base>;

	constructor() {
		this.deta = Deta();
		this.userBase = this.deta.Base('users');
	}

	private async getUsers(): Promise<ObjectType[]> {
		return (await this.userBase.fetch()).items;
	}

	async findOne(username: string): Promise<ObjectType> {
		const users = await this.getUsers();
		return users.find(x => x.username === username);
	}

	async registerUser(user: UserRegistrationDetails): Promise<void> {
		const users = await this.getUsers();
		if (users.find(x => x.username === user.username)) {
			throw new BadRequestException('Username exists');
		}

		const { firstName, lastName, username, password, birthday, gender } = user;
		await this.userBase.put(
			{
				firstName,
				lastName,
				username,
				password: await argon2.hash(password),
				birthday,
				gender
			},
			randomUUID()
		);
	}
}
