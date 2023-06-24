import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('user/profile')
export class ProfileController {
	@UseGuards(AuthGuard)
	@Get(':id')
	getProfileFromId(@Param() { id }) {
		return {};
	}
}
