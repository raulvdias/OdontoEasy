import { Routes } from '@angular/router';
import { SystemComponent } from './system.component';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    component: SystemComponent,
    children: [],
  },
] as Routes;
