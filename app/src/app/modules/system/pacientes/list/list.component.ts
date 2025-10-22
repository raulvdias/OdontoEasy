import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    DatePipe,
    NgFor,
    NgIf,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  isMobile = window.innerWidth < 1000;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 1000;
  }
  searchControl: FormControl = new FormControl('');

  displayedColumns = ['foto', 'nome', 'email', 'dataCadastro', 'acoes'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  pacientes = [
    {
      id: 1,
      nome: 'Ana Souza',
      email: 'ana.souza@email.com',
      telefone: '(11) 98888-1234',
      endereco: 'Rua das Flores, 123 - São Paulo, SP',
      dataCadastro: new Date('2024-08-10'),
      foto: 'https://randomuser.me/api/portraits/women/1.jpg',
      condicao: 'Manutenção de aparelho ortodôntico',
      plano: 'OdontoPlus Premium',
      tipoSanguineo: 'A+',
      ultimaConsulta: new Date('2025-10-05'),
      consultas: [
        {
          data: new Date('2025-10-05'),
          dentista: 'Dr. Carlos Silva',
          procedimento: 'Ajuste de aparelho',
          observacoes: 'Paciente relatou leve desconforto. Reajuste realizado.',
        },
        {
          data: new Date('2025-08-15'),
          dentista: 'Dr. Eduardo Lima',
          procedimento: 'Limpeza dental',
          observacoes: 'Sem observações relevantes.',
        },
      ],
    },
    {
      id: 2,
      nome: 'Carlos Almeida',
      email: 'carlos.almeida@email.com',
      telefone: '(21) 97777-4321',
      endereco: 'Av. Atlântica, 456 - Rio de Janeiro, RJ',
      dataCadastro: new Date('2024-09-05'),
      foto: 'https://randomuser.me/api/portraits/men/2.jpg',
      condicao: 'Implante dentário',
      plano: 'DentalCare Gold',
      tipoSanguineo: 'B+',
      ultimaConsulta: new Date('2025-09-28'),
      consultas: [
        {
          data: new Date('2025-09-28'),
          dentista: 'Dra. Fernanda Rocha',
          procedimento: 'Revisão de implante',
          observacoes: 'Ótima cicatrização. Retorno em 6 meses.',
        },
      ],
    },
    {
      id: 3,
      nome: 'Fernanda Costa',
      email: 'fernanda.costa@email.com',
      telefone: '(31) 99999-6543',
      endereco: 'Rua Esperança, 99 - Belo Horizonte, MG',
      dataCadastro: new Date('2024-10-12'),
      foto: 'https://randomuser.me/api/portraits/women/3.jpg',
      condicao: 'Tratamento de canal',
      plano: 'OdontoEssencial',
      tipoSanguineo: 'O-',
      ultimaConsulta: new Date('2025-10-10'),
      consultas: [
        {
          data: new Date('2025-10-10'),
          dentista: 'Dr. Carlos Silva',
          procedimento: 'Avaliação pós-tratamento',
          observacoes: 'Canal cicatrizado, alta concedida.',
        },
      ],
    },
  ];

  constructor(private _router: Router) {}

  ngOnInit() {
    this.dataSource.data = this.pacientes;
    this.initFilterUsers();
  }

  get filteredPacientes() {
    const query = this.searchControl.value?.toLowerCase() || '';
    return this.pacientes.filter(
      (p) =>
        p.nome.toLowerCase().includes(query) ||
        p.email.toLowerCase().includes(query)
    );
  }

  abrirProntuario(paciente: any) {
    this._router.navigateByUrl(`/system/pacientes/details/${paciente.id}`);
  }

  adicionarPaciente() {
    this._router.navigate(['/system/pacientes/new']);
  }

  initFilterUsers() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        console.log('Buscando por:', query);
      });
  }
}
