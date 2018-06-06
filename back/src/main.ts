import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  let sess = {
    secret: 'keyboard cat',
    cookie: {}
  }
  app.use(session(sess))
  app.useStaticAssets(__dirname + '/public');
  app.setBaseViewsDir(__dirname + '/views');
  app.setViewEngine('ejs'); 

  await app.listen(3000);
}
bootstrap();
