import { Injectable, Logger } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {Stripe} from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Session } from 'inspector/promises';

@Injectable()
export class PaymentService {
private readonly logger = new Logger(PaymentService.name)
private stripe:Stripe

constructor(private configService:ConfigService){
this.stripe = new Stripe(process.env.STRIPE_SECRET!)
}

async createCheckoutSession(
  amount:number,
  currency:string,
  productId:string,
  quantity:number
 ):Promise<Stripe.Checkout.Session>{
  try {

    const session = await this.stripe.checkout.sessions.create({
      line_items:[
        {
          price_data:{
            currency:currency,
            product_data:{
              name:'Product'
            },
            unit_amount: amount *100
          },
          quantity:quantity
        }

      ],
      mode:'payment',
      success_url: `http://localhost:3000/payment/success`,
        cancel_url: `http://localhost:4242/cancel.html`,
      metadata:{
        productId: productId
      }
    })

    return session;

  } catch (error) {
    this.logger.error(error)
    throw error

  }

 }



 async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'checkout.session.completed':
        this.logger.log('Checkout session completed:', event.data.object);
        const session = event.data.object as Stripe.Checkout.Session;
        const { payment_status, customer, metadata } = session;

        if (payment_status === 'paid') {
          this.logger.log(`Payment was successful for customer: ${customer}`);
        } else {
          this.logger.warn('Payment status is not successful:', payment_status);
        }
        break;

      case 'checkout.session.expired':
        this.logger.log('Checkout session expired:', event.data.object);
        break;

      default:
        this.logger.warn(`Unhandled event type ${event.type}`);
        break;
    }
  }
}
