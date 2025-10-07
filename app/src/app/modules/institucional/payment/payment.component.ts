import { Component, OnInit } from '@angular/core';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {
  constructor() {}

  async ngOnInit(): Promise<void> {
    var stripe = await loadStripe(
      'pk_test_51SE88WE2NTSMdUqTVNNNwbdgoumJjWFncPIS6Ar2GsIsAO3nHUClXY4OUksnRLpfvYKPCmlLNHF4HCjjAuK61F7u00w4cCc9mo'
    );
    const options: StripeElementsOptions = {
      mode: 'payment',
      currency: 'usd',
      amount: 1099,
    };
    const elements = stripe?.elements(options);
    const checkout = elements?.create('expressCheckout');
    checkout?.mount('#checkout');
  }
}
