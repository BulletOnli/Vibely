import { IsIn, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UserRegistrationDetails {
	@IsNotEmpty()
	firstName: string;

	@IsNotEmpty()
	lastName: string;

	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	@MinLength(8)
	password: string;

	confirmPassword: string;

	@IsOptional()
	birthday?: string;

	@IsIn(['male', 'female'])
	gender: 'male' | 'female';
}
