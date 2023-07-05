import { ObjectType } from 'deta/dist/types/types/basic';

export interface Friend extends ObjectType {
	key: string;
	isAccepted: boolean;
	firstUser: string;
	secondUser: string;
	senderId: string;
}
