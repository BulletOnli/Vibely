import { IsNotEmpty, IsString } from 'class-validator';

export class PostCreationDetails {
	@IsNotEmpty()
	@IsString()
	caption!: string;
}
