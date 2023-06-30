import { Injectable } from '@nestjs/common';
import { DetaClass } from 'src/deta.class';
import { Post } from './types';

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

	limit(array: Post[], limit: number, offset: number) {
		for (const _x of Array(offset)) {
			array.shift();
		}
		console.log(array);
		array.splice(limit, array.length);
		return array;
	}

	async autoIncKey() {
		const fth = await this.postsBase.fetch();
		const items = fth.items;
		if (items.length === 0) {
			return '1';
		}
		const lastIndex = fth.count - 1;
		const final = parseInt(items[lastIndex].key as unknown as string) + 1;
		return final.toString();
	}
}
