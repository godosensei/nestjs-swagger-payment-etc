import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as bodyParser from 'body-parser';

async function bootstrap() {
const app = await NestFactory.create(AppModule, { cors: true });

  app.use('/payment/webhook', bodyParser.raw({ type: 'application/json' }));


    app.enableCors();
  const config = new DocumentBuilder()
  .setTitle('swagger')
  .setDescription('description')
  .setVersion('1.0')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

    app.enableCors();

  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
