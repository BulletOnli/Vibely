import {
	ArgumentMetadata,
	Injectable,
	NotFoundException,
	PipeTransform
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { isNull } from 'lodash';

@Injectable()
export class UserExistsPipe implements PipeTransform {
	constructor(private user: UserService) {}

	async transform(id: string, _metadata: ArgumentMetadata) {
		if (isNull(await this.user.findOneById(id))) {
			throw new NotFoundException('User not found');
		}
		return id;
	}
}
