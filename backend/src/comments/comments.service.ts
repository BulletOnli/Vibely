import { Injectable } from '@nestjs/common';
import { Base, DetaService } from 'src/deta/deta.service';

@Injectable()
export class CommentsService {
	commentsBase: Base;
	constructor(
		private deta: DetaService
	){
		this.commentsBase = this.deta.createBase("comments");
	}
	async findOne(id: string) {
		return await this.commentsBase.get(id);
	}
}
