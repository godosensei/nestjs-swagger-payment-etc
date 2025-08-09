import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { MailgunService } from './mailgun.service';

@Controller('mailgun')
export class MailgunController {
private readonly logger = new Logger(MailgunController.name)


  constructor(private readonly mailgunService: MailgunService) {}

  @Get()
  sendEmail() {
     const messageData = {
      from: 'amant5105@gmail.com',
      to: 'sufian.majid.999@gmail.com',
      subject: 'Mail',
      text: 'Mail-Sent!',
    };
    return this.mailgunService.sendEmail(messageData);
  }


}
