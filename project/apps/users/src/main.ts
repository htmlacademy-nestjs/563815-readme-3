import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { ApplicationConfig } from '@project/config/config-users';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('The «Blog» service')
    .setDescription('Blog service API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('spec', app, document);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const configService = app.get(ConfigService);
  const usersAppConfig = configService.get<ApplicationConfig>('users');

  if (!usersAppConfig) {
    throw new Error('Users config not found');
  }

  if (!usersAppConfig.port) {
    throw new Error('Users config port not found');
  }

  await app.listen(usersAppConfig.port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${usersAppConfig.port}/${globalPrefix}`
  );
  Logger.log(`🎯  Current mode: ${usersAppConfig.environment}`);
}

bootstrap();
