import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:'*',
    methods:'GET,POST,PUT,DELETE',
    allowedHeaders:'Content-Type,Accept',
    credentials:true
  })
  app.use(
    session({
      secret:'hlll',
      resave:false,
      saveUninitialized:false,
      cookie:{maxAge:60000},
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
