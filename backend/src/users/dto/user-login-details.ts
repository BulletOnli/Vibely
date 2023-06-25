import { IsNotEmpty } from 'class-validator';

export class UserLoginDetails {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;
}
