import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NotifyConfig } from '@project/config/config-notify';

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
      forbidUnknownValues: true,
    })
  );

  const configService = app.get(ConfigService);
  const notifyAppConfig = configService.get<NotifyConfig>('notify');

  if (!notifyAppConfig) {
    throw new Error('Notify config not found');
  }

  if (!notifyAppConfig.port) {
    throw new Error('Notify config port not found');
  }

  await app.listen(notifyAppConfig.port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${notifyAppConfig.port}/${globalPrefix}`
  );
  Logger.log(`🎯  Current mode: ${notifyAppConfig.environment}`);
}

bootstrap();
