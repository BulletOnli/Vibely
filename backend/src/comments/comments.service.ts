import { Injectable } from '@nestjs/common';
import { DetaClass } from 'src/deta.class';

@Injectable()
export class CommentsService extends DetaClass {
	async findOne(id: string) {
		return await this.commentsBase.get(id);
	}
}
