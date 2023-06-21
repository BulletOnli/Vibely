import { BadGatewayException, BadRequestException, Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { join, relative } from 'path';
import { UserRegistrationDetails } from "./dto";

type User = {
	id: number,
	username: string;
	password: string;
}

// temporary fs based db
@Injectable()
export class UserService {
	fakeDB: User[];
	jsonPath!: string;
	constructor(){
		this.jsonPath = join(__dirname, relative(__dirname, "src/users/data.json"));
		this.fakeDB = JSON.parse(
			fs.readFileSync(
				this.jsonPath, 
				"utf8"
			)
		);
	}

	findOne(username: string): User {
		return this.fakeDB.find(x => x.username === username);
	}

	registerUser({ username, password }: Partial<UserRegistrationDetails>): void {
		const lastId = this.fakeDB.at(this.fakeDB.length - 1).id;
		if (this.fakeDB.find(x => x.username === username)) {
			throw new BadRequestException("Username exists");
		}
		this.fakeDB.push({ id: lastId + 1, username, password })
		fs.writeFileSync(this.jsonPath, JSON.stringify(this.fakeDB, null, 2), "utf8");
	}
}
