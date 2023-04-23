import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { BlogConfig } from '@project/config/config-blog';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The «Blog» service')
    .setDescription('Blog service API')
    .setVersion('1.0')
    .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('spec', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const configService = app.get(ConfigService);
  const blogAppConfig = configService.get<BlogConfig>('blog');

  if (!blogAppConfig) {
    throw new Error('Blog config not found');
  }

  if (!blogAppConfig.port) {
    throw new Error('Blog config port not found');
  }

  await app.listen(blogAppConfig.port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${blogAppConfig.port}/${globalPrefix}`
  );
  Logger.log(`🎯  Current mode: ${blogAppConfig.environment}`);
}

bootstrap();
