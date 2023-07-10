import { Base, Deta, Drive } from 'deta';

type BaseType = ReturnType<typeof Base>;
type DriveType = ReturnType<typeof Drive>;

export class DetaClass {
	usersBase: BaseType;
	postsBase: BaseType;
	likesBase: BaseType;
	commentsBase: BaseType;
	commentLikesBase: BaseType;
	friendsBase: BaseType;
	profileDrive: DriveType;
	postPhotos: DriveType;
	constructor() {
		const deta = Deta();
		this.usersBase = deta.Base('users');
		this.postsBase = deta.Base('posts');
		this.likesBase = deta.Base('likes');
		this.commentsBase = deta.Base('comments');
		this.commentLikesBase = deta.Base('commentLikes');
		this.friendsBase = deta.Base('friends');
		this.profileDrive = deta.Drive('profile');
		this.postPhotos = deta.Drive('postPhotos');
	}
}
