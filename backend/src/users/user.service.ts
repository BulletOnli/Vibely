import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ObjectType } from 'deta/dist/types/types/basic';
import { UserRegistrationDetails } from './dto';
import * as argon2 from 'argon2';
import { DetaClass } from 'src/deta.class';

@Injectable()
export class UserService extends DetaClass {
	private async getUsers(): Promise<ObjectType[]> {
		return (await this.usersBase.fetch()).items;
	}

	async findOne(username: string): Promise<ObjectType> {
		const users = await this.getUsers();
		return users.find(x => x.username === username);
	}
	
	async findOneById(id: Id) {
		const users = await this.getUsers();
		return users.find(x => x.key === id);
	}

	async registerUser(user: UserRegistrationDetails): Promise<void> {
		const users = await this.getUsers();
		if (users.find(x => x.username === user.username)) {
			throw new BadRequestException('Username exists');
		} else if (user.password !== user.confirmPassword) {
			throw new BadRequestException('Passwords doesn\'t match.');
		}

		const { firstName, lastName, username, password, birthday, gender } = user;
		await this.usersBase.put(
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

	async deleteOne() {
		throw "Not implemented";
	}
}
