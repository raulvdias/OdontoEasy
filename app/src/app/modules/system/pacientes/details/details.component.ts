import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PacientesService } from '../pacientes.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-details',
  imports: [DatePipe, MatIconModule, NgFor, NgIf, RouterLink, MatTooltipModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);
  paciente!: any;
  constructor(
    private _pacientesService: PacientesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._pacientesService.paciente$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((paciente: any) => {
        this.paciente = paciente;
      });
  }

  editarPaciente(): void {
    this._router.navigate(['/dashboard/pacientes/editar', this.paciente.id]);
  }

  excluirPaciente(): void {
    Swal.fire({
      title: 'Excluir paciente?',
      text: `Deseja realmente excluir ${this.paciente.nome}? Essa ação não poderá ser desfeita.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Excluído!',
          'O paciente foi removido do sistema.',
          'success'
        );
        this._router.navigate(['/dashboard/pacientes']);
      }
    });
  }
}
