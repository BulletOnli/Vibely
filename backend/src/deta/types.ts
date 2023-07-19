import { Base, Deta, Drive } from "deta";

export type VibelyBase = "posts" 
	| "users" 
	| "likes" 
	| "comments" 
	| "commentLikes" 
	| "friends";

export type VibelyDrive = "profile"
	| "postPhotos"
	| "cover";

export type DetaInst = ReturnType<typeof Deta>;
export type BaseInst = ReturnType<typeof Base>;
export type DriveInst = ReturnType<typeof Drive>;
