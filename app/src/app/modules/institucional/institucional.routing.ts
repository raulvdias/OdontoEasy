import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PlansComponent } from './plans/plans.component';
import { InstitucionalComponent } from './institucional.component';

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
    ],
  },
] as Routes;
