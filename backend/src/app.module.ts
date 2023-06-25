import 'dotenv/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './posts/post.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: '30m'
			},
			global: true
		}),
		UserModule,
		PostModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
