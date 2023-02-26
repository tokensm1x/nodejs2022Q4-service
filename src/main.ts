import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';
import 'dotenv/config';
import { LoggerService } from './logger/logger.service';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });
  const document: any = yaml.load(
    await readFile('./doc/api.yaml', { encoding: 'utf-8' }),
  );
  SwaggerModule.setup('doc', app, document);
  const logger = new Logger('Exceptions');
  process.on('uncaughtException', async (error) => {
    logger.error(error);
  });
  process.on('unhandledRejection', async (error) => {
    logger.error(error);
  });
  await app.listen(PORT);
}
bootstrap();
