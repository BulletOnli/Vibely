import { IsString } from "class-validator";

export class BaseModel {
	@IsString()
	key: string;
}
