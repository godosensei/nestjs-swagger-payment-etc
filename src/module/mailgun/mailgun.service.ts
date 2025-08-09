import { Injectable, Logger } from '@nestjs/common';
import Mailgun from 'mailgun.js';
import formData from 'form-data';


require('dotenv').config();

const mailGunKey = process.env.MAILGUN_API_KEY
const mailGunDomain = process.env.MAILGUN_DOMAIN
const mailGunFrom = process.env.MAILGUN_API_KEY

  const client = new Mailgun(FormData).client({
    username: 'api',
    key: mailGunKey!,
    formData
  } as any);

@Injectable()
export class MailgunService {
private readonly logger = new Logger(MailgunService.name)

  sendEmail(data) {
    client.messages.create(mailGunDomain!,data)
  }


}
