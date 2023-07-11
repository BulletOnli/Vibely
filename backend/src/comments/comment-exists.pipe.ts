import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	NotFoundException,
	PipeTransform
} from '@nestjs/common';
import { CommentsService } from './comments.service';

@Injectable()
export class CommentExistsPipe implements PipeTransform {
	constructor(private comment: CommentsService) {}

	async transform(id: string, _metadata: ArgumentMetadata) {
		if (!id) {
			throw new BadRequestException('Comment id is required');
		} else if (!(await this.comment.findOne(id))) {
			throw new NotFoundException('Comment not found');
		}
		return id;
	}
}
