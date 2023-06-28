import { ObjectType } from 'deta/dist/types/types/basic';

export interface Post extends ObjectType {
	key: string;
	caption: string;
	likes: number;
	dislikes: number;
}
