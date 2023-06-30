import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller()
export class UserFriendsController {}
