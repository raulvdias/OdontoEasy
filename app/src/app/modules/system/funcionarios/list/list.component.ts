import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [
    DatePipe,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  isMobile = window.innerWidth < 1000;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 1000;
  }

  funcionarios = [
    {
      id: 'F001',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg',
      nome: 'Carlos Silva',
      email: 'carlos.silva@empresa.com',
      telefone: '(11) 98765-4321',
      cargo: 'Dentista',
      dataAdmissao: new Date(2021, 4, 12),
      endereco: 'Rua das Palmeiras, 120 - São Paulo/SP',
      observacoes:
        'Especialista em odontologia estética e restauração. Atua na clínica desde 2021 com foco em atendimento humanizado.',
    },
    {
      id: 'F002',
      foto: 'https://randomuser.me/api/portraits/women/65.jpg',
      nome: 'Fernanda Rocha',
      email: 'fernanda.rocha@empresa.com',
      telefone: '(11) 99654-2100',
      cargo: 'Secretária',
      dataAdmissao: new Date(2022, 1, 23),
      endereco: 'Av. Central, 456 - São Paulo/SP',
      observacoes:
        'Responsável pelo agendamento de consultas e atendimento ao cliente. Organizada e atenciosa, referência no suporte da equipe.',
    },
    {
      id: 'F003',
      foto: 'https://randomuser.me/api/portraits/men/77.jpg',
      nome: 'Eduardo Lima',
      email: 'eduardo.lima@empresa.com',
      telefone: '(11) 93456-7810',
      cargo: 'Auxiliar Clínico',
      dataAdmissao: new Date(2023, 6, 3),
      endereco: 'Rua das Laranjeiras, 90 - São Paulo/SP',
      observacoes:
        'Auxilia os dentistas nos procedimentos clínicos e na esterilização de instrumentos. Sempre prestativo e cuidadoso com os pacientes.',
    },
  ];

  displayedColumns: string[] = [
    'foto',
    'nome',
    'email',
    'cargo',
    'dataAdmissao',
    'acoes',
  ];

  filteredFuncionarios: any = [];
  searchControl: FormControl = new FormControl('');

  constructor(private _router: Router) {}

  ngOnInit() {
    this.filteredFuncionarios = this.funcionarios;

    this.initFilterFuncionarios();
  }

  initFilterFuncionarios() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.filteredFuncionarios = this.funcionarios.filter((f) =>
          [f.nome, f.email, f.cargo]
            .join(' ')
            .toLowerCase()
            .includes(term.toLowerCase())
        );
      });
  }

  adicionarFuncionario() {
    this._router.navigateByUrl('/system/funcionarios/new');
  }

  abrirPerfil(funcionario: any) {
    this._router.navigateByUrl(
      `/system/funcionarios/details/${funcionario.id}`
    );
  }
}
