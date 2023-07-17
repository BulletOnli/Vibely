import {
	BadRequestException,
	Injectable,
	StreamableFile
} from '@nestjs/common';
import { basename } from 'path';
import { Request } from 'express';
import { lookup } from 'mime-types';
import { DetaService, Drive } from 'src/deta/deta.service';

@Injectable()
export class PostPhotoService {
	postPhotos: Drive;
	constructor(
		private deta: DetaService
	){
		this.postPhotos = this.deta.createDrive("postPhotos");
	}
	async getPhoto(id: string) {
		const list = (await this.postPhotos.list()).names;
		console.log(list)
		const postPhoto = list.find(x => {
			return id === x.split('/')[1];
		});
		if (postPhoto) {
			const file = basename(postPhoto);
			const data = await this.postPhotos.get(postPhoto);
			return new StreamableFile(Buffer.from(await data.arrayBuffer()), {
				type: lookup(file) || ''
			});
		}
		throw new BadRequestException('Photo not found');
	}

	async uploadPhoto(postId: string, userId: string, file: Express.Multer.File) {
		if (file) {
			await this.postPhotos.put(`${userId}/${postId}/${file.originalname}`, {
				data: file.buffer
			});
		}
	}

	async deletePhoto(id: string, userId: string) {
		const photos = (await this.postPhotos.list()).names.filter(file => {
			return file.startsWith(userId) && file.split('/')[1] === id;
		});
		if (photos.length) {
			await this.postPhotos.deleteMany(photos);
		}
	}
}
