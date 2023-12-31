import {
	Controller,
	Get,
	Post,
	Req,
	Param,
	UseGuards,
	UseInterceptors,
	UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../guards/auth.guard';
import { PhotoService } from './services/photo.service';
import { CurrentUserId } from 'src/decorators';

@UseGuards(AuthGuard)
@Controller('user/cover')
export class CoverController {
	constructor(private photo: PhotoService) {}

	@Get(':id')
	async getCoverPicFromId(@Param() { id }) {
		return await this.photo.getPhoto(id, 'cover');
	}

	@Post('upload')
	@UseInterceptors(FileInterceptor('cover'))
	async uploadPicture(
		@UploadedFile() file: Express.Multer.File,
		@CurrentUserId() id: string
	) {
		await this.photo.uploadPhoto(file, id, 'cover');
	}
}
