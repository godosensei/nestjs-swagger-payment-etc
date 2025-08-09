import { Module } from '@nestjs/common';
import { ApiModule } from './module/api/api.module';
import { DummyDataModule } from './module/axios-dummy-data/dummy-data.module';
import { TwilioModule } from './module/twilio/twilio.module';
import { ConfigModule } from '@nestjs/config';
import { MailgunModule } from './module/mailgun/mailgun.module';
import { WebsocketModule } from './module/websocket/websocket.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PaymentModule } from './module/payment/payment.module';
import { GoogleAuthModule } from './module/google-auth/google-auth.module';
@Module({

  imports: [ConfigModule.forRoot({isGlobal:true}),ApiModule, DummyDataModule,TwilioModule, MailgunModule, WebsocketModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // folder for your HTML file
    }),

    PaymentModule,

    GoogleAuthModule,
  ],

})



export class AppModule {}
