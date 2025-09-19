import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const hostUrl = configService.get<string>('HOST');

  app.enableCors({
    origin: hostUrl,
    credentials: true,
  });

  await app.listen(configService.get<string>('PORT') ?? 5000);
}

bootstrap();

