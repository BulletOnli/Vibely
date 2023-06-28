import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	Delete,
	Req,
	NotFoundException,
	Query,
	Put
} from '@nestjs/common';
import { Request } from 'express';
import { DetaClass } from 'src/deta.class';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from 'src/users/user.service';
import { PostService } from './post.service';
import { GetAllDto, PostCreationDetails } from './dto';
import { ObjectType } from 'deta/dist/types/types/basic';
import { Post as PostType } from './types';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController extends DetaClass {
	constructor(private user: UserService, private post: PostService) {
		super();
	}

	@Post('create')
	async createPost(
		@Body() postDetails: PostCreationDetails,
		@Req() req: Request
	) {
		const id = req['user'].sub;
		await this.postsBase.put(
			{
				caption: postDetails.caption,
				userId: id,
				likes: 0,
				dislikes: 0
			},
			await this.post.autoIncKey()
		);
	}

	@Get()
	async getPost(@Query('id') id: number) {
		const post = await this.postsBase.get(id.toString());
		if (!post) {
			throw new NotFoundException('Post not found');
		}
		return post;
	}

	@Put('update')
	async updatePost(@Query('id') id: number, @Body() body: PostCreationDetails) {
		await this.postsBase.update(body as unknown as ObjectType, id.toString());
	}

	@Delete('delete')
	async deletePost(@Query('id') id: number) {
		await this.postsBase.delete(id.toString());
	}

	@Get('all')
	async getAllFromUserId(
		@Query() { id, limit = '10', offset = '0' }: GetAllDto
	) {
		const user = await this.user.findOneById(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		const posts = await this.postsBase.fetch();
		const filtered = posts.items.filter(
			x => x.userId === user.key
		) as PostType[];

		return this.post.limit(filtered, parseInt(limit), parseInt(offset));
	}
}
