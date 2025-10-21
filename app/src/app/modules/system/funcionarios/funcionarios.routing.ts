import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { FuncionariosComponent } from './funcionarios.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { FuncionariosService } from './funcionarios.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

const funcionarioResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const funcionariosService = inject(FuncionariosService);
  const router = inject(Router);
  return funcionariosService.getFuncionario(route.paramMap.get('id')).pipe(
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
    component: FuncionariosComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        resolve: {
          funcionarioResolver,
        },
      },
    ],
  },
] as Routes;
