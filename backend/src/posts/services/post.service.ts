import { Injectable } from '@nestjs/common';
import { DetaClass } from 'src/deta.class';
import { Post } from '../types';

@Injectable()
export class PostService extends DetaClass {
	async exists(id: number): Promise<boolean> {
		if (await this.postsBase.get(id.toString())) {
			return true;
		} else {
			return false;
		}
	}

	async findOne(id: number): Promise<Post | undefined> {
		return (await this.postsBase.get(id.toString())) as Post;
	}
}
