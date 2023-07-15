import {
	Controller,
	Post,
	Get,
	Query,
	ParseUUIDPipe,
	BadRequestException
} from '@nestjs/common';
import { isEmpty, isNull } from 'lodash';

import { Friend } from './types';

import { DetaClass } from 'src/deta.class';

import { CurrentUserId } from './user.decorator';

import { UserExistsPipe } from './pipes/user-exists.pipe';
import { OptionalParseIntPipe } from './pipes/optional-parse-int.pipe';
import { FriendsService } from './services/friends.service';

const uuidPipe = new ParseUUIDPipe({ version: '4' });

@Controller('user/friends')
export class UserFriendsController extends DetaClass {
	constructor(private friend: FriendsService) {
		super();
	}

	@Post('add')
	async addFriend(
		@CurrentUserId() userSender: string,
		@Query('id', uuidPipe, UserExistsPipe) id: string
	) {
		const status = await this.friend.isRequestSentOrResponse(userSender, id);
		if (isNull(status)) {
			await this.friendsBase.putMany([
				{
					isAccepted: false,
					firstUser: userSender,
					secondUser: id,
					senderId: userSender
				},
				{
					isAccepted: false,
					firstUser: id,
					secondUser: userSender,
					senderId: userSender
				}
			]);
			return {
				toastNotify: 'Request sent'
			};
		} else {
			let exception: string;
			switch (status) {
				case 'requestSent':
					exception = 'You already sent a request to that user.';
					break;
				case 'response':
					exception = 'That user had sent you a request.';
					break;
				case 'friends':
					exception = 'You are already friends with that user.';
					break;
			}
			throw new BadRequestException(exception);
		}
	}

	@Get()
	async getFriendsById(
		@Query('id', uuidPipe, UserExistsPipe) id: string,
		@Query('limit', new OptionalParseIntPipe({ defaultValue: 15 }))
		limit: number
	) {
		return (
			await this.friendsBase.fetch(
				{ firstUser: id, isAccepted: true },
				{ limit }
			)
		).items;
	}

	@Post('unfriend')
	async unfriend(
		@CurrentUserId() currentId: string,
		@Query('id', uuidPipe, UserExistsPipe) id: string
	) {
		const userToUnfriend = await this.friend.getFriendItems(currentId, id);
		const [a, b] = userToUnfriend;
		if (b) {
			const prom1 = this.friendsBase.delete(a.key as string);
			const prom2 = this.friendsBase.delete(b.key as string);
			Promise.all([prom1, prom2]);
		} else {
			throw new BadRequestException(
				'You already unfriended this user or not friends.'
			);
		}
	}

	@Post('accept')
	async acceptFriendRequest(
		@CurrentUserId() currentId: string,
		@Query('id', uuidPipe, UserExistsPipe) id: string
	) {
		if (currentId === id) {
			throw new BadRequestException("You can't accept yourself.");
		}
		const items = await this.friend.getFriendItems(currentId, id);
		if (isEmpty(items)) {
			throw new BadRequestException(
				"This user doesn't send you a friend request."
			);
		}
		const [a, b] = items;
		if (!a.isAccepted && !b.isAccepted) {
			const prom1 = this.friendsBase.update(
				{ isAccepted: true } as Friend,
				a.key
			);
			const prom2 = this.friendsBase.update(
				{ isAccepted: true } as Friend,
				b.key
			);
			Promise.all([prom1, prom2]);
		} else {
			throw new BadRequestException('You already accepted this user.');
		}
	}
}
