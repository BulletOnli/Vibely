import {
	IsNotEmpty,
	IsNumberString,
	IsOptional,
	IsString
} from 'class-validator';

export class GetAllDto {
	@IsNotEmpty()
	@IsString()
	id: Id;

	// @IsNumberString()
	@IsOptional()
	limit: string;

	// @IsNumberString()
	@IsOptional()
	offset: string;
}
