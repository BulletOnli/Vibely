import {
	BadRequestException,
	Injectable,
	StreamableFile
} from '@nestjs/common';
import { basename } from 'path';
import { Request } from 'express';
import { lookup } from 'mime-types';
import { DetaClass } from 'src/deta.class';

@Injectable()
export class PostPhotoService extends DetaClass {
	async getPhoto(id: string, req: Request) {
		const userId = req['user'].sub;
		const list = (await this.postPhotos.list()).names;
		const postPhoto = list.find(x => {
			return x.startsWith(userId) && id === x.split('/')[1];
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

	async deletePhoto(id: string, req: Request) {
		const userId = req['user'].sub;
		this.postPhotos.deleteMany(
			(await this.postPhotos.list()).names.filter(file => {
				return file.startsWith(userId) && file.split('/')[1] === id;
			})
		);
	}
}
