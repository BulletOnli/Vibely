import { 
	Body,
	Controller,
	Get,
	Param,
	Post,
	UseGuards,
	Delete,
	Req,
	NotFoundException,
  Query
} from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";
import { Request } from 'express';
import { DetaClass } from "src/deta.class";
import { AuthGuard } from "src/guards/auth.guard";
import { UserService } from "src/users/user.service";

class PostCreationDetails {
	@IsNotEmpty()
	@IsString()
	caption!: string;
}

@UseGuards(AuthGuard)
@Controller("post")
export class PostController extends DetaClass {
	constructor(private user: UserService){
		super();
	}

	private async autoIncKey(){
		return ((await this.postsBase.fetch()).count + 1).toString();
	}

	@Post("create")
	async createPost(@Body() postDetails: PostCreationDetails, @Req() req: Request){
		const id = req['user'].sub;
		await this.postsBase.put({
			caption: postDetails.caption,
			userId: id,
			likes: 0,
			dislikes: 0
		}, await this.autoIncKey());
	}	

	@Get()
	async getPostById(@Query("id") id: number){
		const post = await this.postsBase.get(id.toString());
		if (!post) {
			throw new NotFoundException("Post not found");
		}
		return post;
	}
	
	@Delete("delete")
	deletePostById(){
		throw "Not implemented";
	}

	@Get("all")
	async getAllFromUserId(@Query("id") id: Id, @Query("limit") limit: number){
		const user = await this.user.findOneById(id);
		if (!user) {
			throw new NotFoundException("User not found");
		}
		const posts = await this.postsBase.fetch();
		const filtered = posts.items.filter(x => x.userId === user.key);
		if (limit) {
			filtered.splice(limit, filtered.length);
		}
		return filtered;
 	}
}
