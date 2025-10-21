import { Routes } from '@angular/router';
import { ConsultasComponent } from './consultas.component';
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
    component: ConsultasComponent,
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
