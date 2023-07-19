import { Injectable } from '@nestjs/common';
import { FetchResponse } from 'deta/dist/types/types/base/response';
import { Base, DetaService } from 'src/deta/deta.service';

@Injectable()
export class CommentLikesService {
	commentLikesBase: Base;
	constructor(private deta: DetaService){
		this.commentLikesBase = this.deta.createBase('commentLikes');
	}
	async findOne(id: string) {
		return await this.commentLikesBase.get(id);
	}
	async deleteMany({ items }: FetchResponse) {
		const proms = [];
		items.forEach(x => {
			proms.push(this.commentLikesBase.delete(x.key.toString()));
		});
		await Promise.all(proms);
	}
}
