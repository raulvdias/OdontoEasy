import { Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    component: SystemComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'scrumboard',
        loadChildren: () => import('./scrumboard/scrumboard.routes'),
      },
    ],
  },
] as Routes;
