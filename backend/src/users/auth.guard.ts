import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { IncomingHttpHeaders } from "http";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwt: JwtService){}
  async canActivate(context: ExecutionContext): Promise<boolean> {
  	const req: Request = context.switchToHttp().getRequest();
  	const token = this.extractTokenFromHeaders(req.headers);
  	if (!token) {
  		throw new UnauthorizedException();
  	}
  	try {
  		const payload = await this.jwt.verifyAsync(token, {
  			secret: process.env.JWT_SECRET
  		});
  		console.log(payload)
  	} catch (e) {
  		throw new UnauthorizedException();
  	}
  	return true;
  }

  private extractTokenFromHeaders(headers: IncomingHttpHeaders): string | undefined {
  	return headers.authorization?.split(' ')[1];
  }
}