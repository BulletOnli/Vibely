import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class UserRegistrationDetails {
	@IsNotEmpty()
	firstName: string;

	@IsNotEmpty()
	lastName: string;

	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;

	confirmPassword: string;

	@IsOptional()
	birthday?: string;

	@IsIn(['male', 'female'])
	gender: 'male' | 'female';
}
