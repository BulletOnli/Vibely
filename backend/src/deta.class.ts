import { Base, Deta, Drive } from 'deta';

type BaseType = ReturnType<typeof Base>;
type DriveType = ReturnType<typeof Drive>;

export class DetaClass {
	deta: ReturnType<typeof Deta>;
	usersBase: BaseType;
	postsBase: BaseType;
	likesBase: BaseType;
	profileDrive: DriveType;
	coverDrive: DriveType;
	constructor() {
		this.deta = Deta();
		this.usersBase = this.deta.Base('users');
		this.postsBase = this.deta.Base('posts');
		this.likesBase = this.deta.Base('likes');
		this.profileDrive = this.deta.Drive('profile');
		this.coverDrive = this.deta.Drive('profile');
	}
}
