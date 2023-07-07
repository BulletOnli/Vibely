import { Base, Deta, Drive } from 'deta';

type BaseType = ReturnType<typeof Base>;
type DriveType = ReturnType<typeof Drive>;

export class DetaClass {
	deta: ReturnType<typeof Deta>;
	usersBase: BaseType;
	postsBase: BaseType;
	likesBase: BaseType;
	friendsBase: BaseType;
	profileDrive: DriveType;
	postPhotos: DriveType;
	constructor() {
		this.deta = Deta();
		this.usersBase = this.deta.Base('users');
		this.postsBase = this.deta.Base('posts');
		this.likesBase = this.deta.Base('likes');
		this.friendsBase = this.deta.Base('friends');
		this.profileDrive = this.deta.Drive('profile');
		this.postPhotos = this.deta.Drive('postPhotos');
	}
}
