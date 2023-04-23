import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { FilesConfig } from '@project/config/config-files';
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
  const filesAppConfig = configService.get<FilesConfig>('files');

  if (!filesAppConfig) {
    throw new Error('Files config not found');
  }

  if (!filesAppConfig.port) {
    throw new Error('Files config port not found');
  }

  await app.listen(filesAppConfig.port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${filesAppConfig.port}/${globalPrefix}`
  );
  Logger.log(`🎯  Current mode: ${filesAppConfig.environment}`);
}

bootstrap();
