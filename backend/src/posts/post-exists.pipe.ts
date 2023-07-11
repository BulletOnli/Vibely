import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	NotFoundException,
	PipeTransform
} from '@nestjs/common';
import { PostService } from './services/post.service';

@Injectable()
export class PostExistsPipe implements PipeTransform {
	constructor(private post: PostService) {}

	async transform(id: string, _metadata: ArgumentMetadata) {
		if (!id) {
			throw new BadRequestException('Post id is required');
		} else if (!(await this.post.exists(parseInt(id)))) {
			throw new NotFoundException('Post not found');
		}
		return id;
	}
}
