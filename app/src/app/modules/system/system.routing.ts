import { Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { ProfileComponent } from './profile/profile.component';
import { PacientesComponent } from './pacientes/pacientes.component';

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
        path: 'pacientes',
        loadChildren: () => import('./pacientes/pacientes.routing'),
      },
      {
        path: 'funcionarios',
        loadChildren: () => import('./funcionarios/funcionarios.routing'),
      },
      {
        path: 'scrumboard',
        loadChildren: () => import('./scrumboard/scrumboard.routing'),
      },
      {
        path: 'consultas',
        loadChildren: () => import('./consultas/consultas.routing'),
      },
      {
        path: 'financeiro',
        loadChildren: () => import('./financeiro/financeiro.routing'),
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
] as Routes;
