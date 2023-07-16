import { Injectable } from '@nestjs/common';
import { Deta, Base as DetaBase, Drive as DetaDrive } from 'deta';

export type VibelyBase = "posts" 
	| "users" 
	| "likes" 
	| "comments" 
	| "commentLikes" 
	| "friends";

export type VibelyDrive = "profile"
	| "postPhotos"
	| "cover";

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
}
