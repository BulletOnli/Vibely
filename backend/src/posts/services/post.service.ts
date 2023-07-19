import { Injectable } from '@nestjs/common';
import { Post } from '../types';
import { Base, DetaService } from 'src/deta/deta.service';

@Injectable()
export class PostService {
	postsBase: Base;
	constructor(
		private deta: DetaService
	){
		this.postsBase = this.deta.createBase("posts");
	}

	async exists(id: string): Promise<boolean> {
		if (await this.postsBase.get(id)) {
			return true;
		} else {
			return false;
		}
	}

	async findOne(id: string): Promise<Post | undefined> {
		return (await this.postsBase.get(id)) as Post;
	}
}
