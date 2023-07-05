import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUserId = createParamDecorator(
	(_data: any, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();
		return req['user'].sub;
	}
);
