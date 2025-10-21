import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { PacientesComponent } from './pacientes.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { inject } from '@angular/core';
import { PacientesService } from './pacientes.service';
import { catchError, throwError } from 'rxjs';

const pacienteResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const pacientesService = inject(PacientesService);
  const router = inject(Router);

  return pacientesService.getPaciente(route.paramMap.get('id')).pipe(
    catchError((error) => {
      console.error(error);
      const parentUrl = state.url.split('/').slice(0, -1).join('/');
      router.navigateByUrl(parentUrl);
      return throwError(error);
    })
  );
};

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: '',
    component: PacientesComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        resolve: {
          pacienteResolver,
        },
      },
    ],
  },
] as Routes;
