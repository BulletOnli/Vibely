import { IsIn, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { BaseModel } from "./BaseModel";

export class User extends BaseModel {
	@IsNotEmpty()
	firstName: string;

	@IsNotEmpty()
	lastName: string;

	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	@MinLength(8)
	password: string;

	@IsOptional()
	birthday?: string;

	@IsIn(['male', 'female'])
	gender: 'male' | 'female';
}
