import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
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

  _paciente: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {}

  get paciente$(): Observable<any> {
    return this._paciente.asObservable();
  }

  getPaciente(id: any): Observable<any> {
    const paciente = this.pacientes.find((paciente) => paciente.id == id);
    this._paciente.next(paciente);
    return this._paciente;
  }
}
