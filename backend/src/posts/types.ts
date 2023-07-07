import { ObjectType } from 'deta/dist/types/types/basic';

export interface Post extends ObjectType {
	caption: string;
	likes: number;
	dislikes: number;
	userId: string;
	hasPhoto: boolean;
}
