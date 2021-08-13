/**
 * @fileOverview File that is bootstraping the application.
 * @link   /
 * @file   main.ts
 * @author dileep10060@ksfe.com
 * @since  1.0.0
 * @version 1.0.0
 */
 import { join } from 'path';
 
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as rfs from 'rotating-file-stream';

import { AppModule } from './app.module';
import { Config } from './config';

async function bootstrap() {
  // setup morgan for logging
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: Config.project.logPath,
  });
  const app = await NestFactory.create(AppModule);
  app.use(morgan('combined', { stream: accessLogStream }));

  // setup swagger UI
  if (Config.project.environment === 'dev') {
    const options = new DocumentBuilder()
      .setTitle('STUDENT Product Back end System')
      .setDescription('Product REST API specifications')
      .setVersion('1.0')     
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }

  // enable helmet for security
  // app.use(helmet()); #this should be enabled for production

  // enable CORS
  app.enableCors();
  await app.listen(Config.project.port || 3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
