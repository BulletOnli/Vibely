import { Injectable } from '@nestjs/common';
import { Deta, Base as DetaBase, Drive as DetaDrive } from 'deta';
import { Model } from './model';
import { VibelyBase, VibelyDrive } from './types';
import { BaseModel } from 'src/models/BaseModel';
import { Storage } from './storage';

export type Base = ReturnType<typeof DetaBase>;
export type Drive = ReturnType<typeof DetaDrive>;

@Injectable()
export class DetaService {
	deta: ReturnType<typeof Deta>;
	constructor(){
		this.deta = Deta();
	}
	createDrive(drive: VibelyDrive){
		return this.deta.Drive(drive);
	}
	createBase(base: VibelyBase){
		return this.deta.Base(base);
	}

	// a replacement for createBase
	createModel<T extends BaseModel>(base: VibelyBase){
		return new Model<T>(
			this.deta,
			base
		);
	}

	// replacement for createDrive
	createStorage(drive: VibelyDrive){
		return new Storage(
			this.deta, 
			drive
		);
	}
}
