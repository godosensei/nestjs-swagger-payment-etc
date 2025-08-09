import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Headers } from '@nestjs/common';
import { PaymentService } from './payment.service';
import Stripe from 'stripe';
import { Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

@Post()
async createCheckoutSession(
  @Body()body:{
    amount: number,
    currency: string,
    productId: string,
    quantity: number
  }
):Promise<Stripe.Checkout.Session>{
  const{amount,currency,productId,quantity} = body
return this.paymentService.createCheckoutSession(amount,currency,productId,quantity)

}


@Post('webhook')
  async handleStripeWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') sig: string,
  ) {
    const endpointSecret = process.env.WEB_HOOK_SECRET;
    let event: Stripe.Event;

    try {
      event = this.paymentService['stripe'].webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret!,
      );
    } catch (err) {
      return { error: `Webhook Error: ${err.message}` };
    }

    await this.paymentService.handleWebhook(event);
  }


@Get('success')
success(){
  return 'success'
}


@Get('cancel')
cancel(){
  return 'cancel'
}
}
