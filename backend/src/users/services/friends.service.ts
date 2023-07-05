import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty, isUndefined } from 'lodash';
import { Friend } from '../types';
import { DetaClass } from 'src/deta.class';

type FriendRequestStatus = "response" | "requestSent" | "friends" | null;

@Injectable()
export class FriendsService extends DetaClass {
	async getFriendItems(
		currentId: string,
		id: string
	): Promise<Friend[]> {
		return (
			await this.friendsBase.fetch([
				{
					firstUser: currentId,
					secondUser: id
				},
				{
					firstUser: id,
					secondUser: currentId
				}
			])
		).items as Friend[];
	}
	
	async isRequestSentOrResponse(
		firstUser: string,
		secondUser: string
	): Promise<FriendRequestStatus>{
		const sendersFriends = (await this.friendsBase.fetch({ firstUser, secondUser })).items;

		let value: FriendRequestStatus;
		
		if (firstUser === secondUser) {
			throw new BadRequestException("firstUser and secondUser cannot be matched.");
		}

		if (isEmpty(sendersFriends)) {
			value = null;
		} else if (!isUndefined(
			sendersFriends.find((x: Friend) => x.firstUser !== x.senderId && !x.isAccepted)
		)) {
			value = "response";
		} else if (!isUndefined(
			sendersFriends.find((x: Friend) => x.firstUser === x.senderId && !x.isAccepted)
		)) {
			value = "requestSent";
		} else {
			value = "friends";
		}
		return value;
	}
}
