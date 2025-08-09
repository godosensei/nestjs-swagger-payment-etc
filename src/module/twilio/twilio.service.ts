require('dotenv').config();
import { Injectable, Logger } from '@nestjs/common';
import {Twilio} from 'twilio'


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phone = process.env.TWILIO_PHONE_NUMBER
const client =new  Twilio(accountSid, authToken);

@Injectable()
export class TwilioService {
  private readonly logger = new Logger(TwilioService.name)

  async sendMessage() {
const message = await client.messages.create({
    body: "yo",
    from: phone,
    to: "+923265773718",
  });
  this.logger.log('message')

  return message

  }


}
