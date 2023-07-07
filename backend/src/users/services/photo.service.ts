import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { parse } from 'path';
import { lookup } from 'mime-types';
import { Deta, Drive } from 'deta';

@Injectable()
export class PhotoService {
	deta = Deta();
	drive: ReturnType<typeof Drive>;

	async uploadPhoto(file: Express.Multer.File, id: string, base: string) {
		this.drive = this.deta.Drive(base);
		await this.drive.put(`${id}/${file.originalname}`, {
			data: file.buffer
		});
	}

	async getPhoto(id: string, base: string) {
		this.drive = this.deta.Drive(base);
		const list = (await this.drive.list()).names;
		const val = list.find(value => {
			const user = parse(value).dir;
			return user === id;
		});
		if (val) {
			const file = await this.drive.get(val);
			return new StreamableFile(Buffer.from(await file.arrayBuffer()), {
				type: lookup(val) || ''
			});
		} else {
			throw new NotFoundException('Profile picture not found');
		}
	}
}
