import {
	Controller,
	Get,
	Post,
	Param,
	UseGuards,
	UseInterceptors,
	UploadedFile,
	ParseUUIDPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../guards/auth.guard';
import { PhotoService } from './services/photo.service';
import { CurrentUserId } from 'src/decorators';

@UseGuards(AuthGuard)
@Controller('user/profile')
export class ProfileController {
	constructor(private photo: PhotoService) {
	}

	@Get('pic/:id')
	async getProfilePicFromId(
		@Param('id', new ParseUUIDPipe({ version: '4' })) id: string
	) {
		return await this.photo.getPhoto(id, 'profile');
	}

	@Post('upload')
	@UseInterceptors(FileInterceptor('profile'))
	async uploadPicture(
		@UploadedFile() file: Express.Multer.File,
		@CurrentUserId() id: string
	) {
		await this.photo.uploadPhoto(file, id, 'profile');
	}
}
