import { Base, Deta } from 'deta';

type BaseType = ReturnType<typeof Base>;

export class DetaClass {
	deta: ReturnType<typeof Deta>;
	usersBase: BaseType;
	postsBase: BaseType;
	likesBase: BaseType;
	constructor() {
		this.deta = Deta();
		this.usersBase = this.deta.Base('users');
		this.postsBase = this.deta.Base('posts');
		this.likesBase = this.deta.Base('likes');
	}
}
