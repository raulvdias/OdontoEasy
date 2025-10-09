import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/institucional/institucional.routing'),
      },
    ],
  },
  {
    path: 'system',
    loadChildren: () => import('./modules/system/system.routing'),
  },
];
