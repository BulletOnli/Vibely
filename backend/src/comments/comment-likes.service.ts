import { Injectable } from '@nestjs/common';
import { FetchResponse } from 'deta/dist/types/types/base/response';
import { DetaClass } from 'src/deta.class';

@Injectable()
export class CommentLikesService extends DetaClass {
	async findOne(id: string) {
		return await this.commentLikesBase.get(id);
	}
	async deleteMany({ items }: FetchResponse) {
		const proms = [];
		console.log('ssss');
		items.forEach(x => {
			proms.push(this.commentLikesBase.delete(x.key.toString()));
		});
		await Promise.all(proms);
	}
}
