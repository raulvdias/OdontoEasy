import { Routes } from '@angular/router';
import { FinanceiroComponent } from './financeiro.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: '',
    component: FinanceiroComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'details',
        component: DetailsComponent,
      },
     
    ],
  },
] as Routes;
