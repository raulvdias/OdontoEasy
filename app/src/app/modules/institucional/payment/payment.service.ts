import { Injectable } from '@angular/core';
import { Stripe } from 'stripe';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private key = environment.stripeKeySecret;
  constructor() {}

  async createSession(): Promise<any> {
    const stripe = new Stripe(this.key);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1SFh1PE2NTSMdUqTgy0Gt0RC',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      ui_mode: 'embedded',
      redirect_on_completion: 'never',
    });

    const { client_secret } = session;
    return client_secret;
  }
}
