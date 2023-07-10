import {
	BadRequestException,
	Body,
	Controller,
	Post,
	Query,
	UseGuards,
	ValidationPipe
} from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { DetaClass } from 'src/deta.class';
import { AuthGuard } from 'src/guards/auth.guard';
import { PostExistsPipe } from 'src/posts/post-exists.pipe';
import { CurrentUserId } from 'src/users/user.decorator';

class TextDto {
	@IsNotEmpty()
	@IsString()
	text: string;
}

@UseGuards(AuthGuard)
@Controller('comment')
export class CommentsController extends DetaClass {
	@Post('add')
	async addComment(
		@CurrentUserId() currentId: string,
		@Query('id', PostExistsPipe) postId: string,
		@Body() { text }: TextDto
	) {
		// if (!postId) {
		// 	throw new BadRequestException("Post id is included");
		// }
		// await this.commentsBase.put({ text, likes: 0, dislikes: 0, postId, userId: currentId });
	}
}
