import { IsBoolean, IsString, IsUUID } from "class-validator";
import { BaseModel } from "./BaseModel";

export class Friend extends BaseModel {
	@IsBoolean()
	isAccepted: boolean;

	@IsString()
	firstUser: string;
	
	@IsString()
	secondUser: string;
	
	@IsUUID(4)
	@IsString()
	senderId: string;
}
