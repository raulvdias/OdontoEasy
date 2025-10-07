import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from './payment.service';
import { environment } from '../../../environment';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {
  private key = environment.stripeKey;
  constructor(private _stripeService: PaymentService) {}

  ngOnInit() {
    this._stripeService.createSession().then(async (client: any) => {
      let stripe = await loadStripe(this.key);
      const checkout = await stripe?.initEmbeddedCheckout({
        clientSecret: client,
      });
      checkout?.mount('#checkout');
    });
  }
}
