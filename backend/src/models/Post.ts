import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator";
import { BaseModel } from "./BaseModel";

export class Post extends BaseModel {
	@IsString()
	caption: string;

	@IsNumber()
	likes: number;

	@IsNumber()
	dislikes: number;

	@IsString()
	@IsUUID(4)	
	userId: string;
	
	@IsBoolean()
	hasPhoto: boolean;

	@IsString()
	createdAt: string;
}
