import { Injectable } from '@nestjs/common';
import { DetaClass } from 'src/deta.class';

@Injectable()
export class PostService extends DetaClass {
	async exists(id: number): Promise<boolean> {
		if (await this.postsBase.get(id.toString())) {
			return true;
		} else {
			return false;
		}
	}
}
