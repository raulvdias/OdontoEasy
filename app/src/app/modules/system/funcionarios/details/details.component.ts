import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FuncionariosService } from '../funcionarios.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [MatIconModule, DatePipe, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  funcionario!: any;
  private _destroyRef = inject(DestroyRef);
  constructor(private _funcionariosService: FuncionariosService) {}

  ngOnInit(): void {
    this.initFuncionario();
  }

  initFuncionario() {
    this._funcionariosService.funcionario$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((funcionario: any) => {
        this.funcionario = funcionario;
      });
  }
}
