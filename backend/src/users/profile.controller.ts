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
import { Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { DetaClass } from 'src/deta.class';
import { PhotoService } from './services/photo.service';

@UseGuards(AuthGuard)
@Controller('user/profile')
export class ProfileController extends DetaClass {
	constructor(private photo: PhotoService) {
		super();
	}

	// getting user info
	@Get(':id')
	async getProfileFromId(@Param() { id }) {
		console.log(await this.profileDrive.list());
		return {};
	}

	@Get('pic/:id')
	async getProfilePicFromId(@Param() { id }) {
		return await this.photo.getPhoto(id, 'profile');
	}

	@Post('upload')
	@UseInterceptors(FileInterceptor('profile'))
	async uploadPicture(
		@UploadedFile() file: Express.Multer.File,
		@Req() req: Request
	) {
		await this.photo.uploadPhoto(file, req, 'profile');
	}
}
