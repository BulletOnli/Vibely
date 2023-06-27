import { ObjectType } from 'deta/dist/types/types/basic';
import { Injectable } from '@nestjs/common';
import { DetaClass } from 'src/deta.class';

interface Post extends ObjectType {
	key: string;
	caption: string;
}

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
