import {
	IsNotEmpty,
	IsNumberString,
	IsOptional,
	IsString,
	IsUUID
} from 'class-validator';

export class GetAllDto {
	@IsNotEmpty()
	@IsUUID(4)
	@IsString()
	id: string;

	@IsNumberString()
	@IsOptional()
	limit: number;

	@IsNumberString()
	@IsOptional()
	offset: number;
}
