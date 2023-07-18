import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUserId = createParamDecorator(
	(_data: any, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest() as Request;
		return req['user'].sub;
	}
);

export const QueryId = createParamDecorator(
	(_data: any, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest() as Request;
		return req.query.id;
	}
)
