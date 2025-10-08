import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PlansComponent } from './plans/plans.component';
import { InstitucionalComponent } from './institucional.component';
import { PaymentComponent } from './payment/payment.component';
import { LoginComponent } from './login/login.component';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    component: InstitucionalComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'plans',
        component: PlansComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
] as Routes;
