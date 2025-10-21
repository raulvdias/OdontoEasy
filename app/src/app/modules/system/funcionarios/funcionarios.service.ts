import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuncionariosService {
  _funcionario: BehaviorSubject<any> = new BehaviorSubject(null);

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

  constructor(private _httpClient: HttpClient) {}

  get funcionario$(): Observable<any> {
    return this._funcionario.asObservable();
  }

  getFuncionario(id: any): Observable<any> {
    const funcionario =
      this.funcionarios.find((f) => f.id === id) || this.funcionarios[0];
    this._funcionario.next(funcionario);

    return this._funcionario;
  }
}
