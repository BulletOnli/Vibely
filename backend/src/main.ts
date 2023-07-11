import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

(async () => {
	const port = 8080;
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());

	const isDev = process.env.NODE_ENV === 'development';

	if (isDev) {
		const doc = new DocumentBuilder()
			.setTitle('social-app backend')
			.setDescription('Backend for social media web application')
			.addTag('backend')
			.build();
		const docFactory = SwaggerModule.createDocument(app, doc);
		SwaggerModule.setup('/api', app, docFactory);
	}

	await app.listen(port, () => {
		console.log(
			'Server address to open (browser): http://localhost:' +
				port +
				(isDev ? '/api' : '')
		);
	});
})();
