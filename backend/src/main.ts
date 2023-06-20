import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
  const port = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log("Server listening at port " + port);
  console.log("http://localhost:" + port);
})();
