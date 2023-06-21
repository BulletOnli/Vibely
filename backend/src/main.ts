import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

(async () => {
  const port = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV === 'development') {
    const doc = new DocumentBuilder()
      .setTitle("social-app backend")
      .setDescription("Backend for social media web application")
      .addTag('backend')
      .build();
    const docFactory = SwaggerModule.createDocument(app, doc);
    SwaggerModule.setup("/api", app, docFactory);
  }

  await app.listen(port, () => {
    console.log("Server address to open: http://localhost:" + port);
  });
})();
