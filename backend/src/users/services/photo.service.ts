import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { parse } from 'path';
import { lookup } from 'mime-types';
import * as dayjs from 'dayjs';
import { DetaService } from 'src/deta/deta.service';
import { VibelyDrive } from 'src/deta/types';

@Injectable()
export class PhotoService {
	constructor(private deta: DetaService){}

	async uploadPhoto(file: Express.Multer.File, id: string, driveName: string) {
		const drive = this.deta.createDrive(driveName as VibelyDrive)
		await drive.put(`${id}/${new Date().toISOString()} - ${file.originalname}`, {
			data: file.buffer
		});
	}

	async getPhoto(id: string, driveName: string) {
		const drive = this.deta.createDrive(driveName as VibelyDrive);
		const list = (await drive.list()).names;
		
		const pics = list.filter(value => {
			const user = parse(value).dir;
			return user === id;
		}).sort((a, b) => dayjs(a).isBefore(new Date(b)) ? 1 : -1);

		if (pics.length) {
			const val = pics.at(0);
			const file = await drive.get(pics.at(0));
			return new StreamableFile(Buffer.from(await file.arrayBuffer()), {
				type: lookup(val) || ''
			});
		} else {
			throw new NotFoundException(driveName === 'cover' ? 'Cover picture not found' : 'Profile picture not found');
		}
	}
}
