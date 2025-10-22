import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import cpfValidator from '../../../../utils/utils';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-new',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    NgIf,
    MatInputModule,
    MatTooltipModule,
    NgxMaskDirective,
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent implements OnInit {
  funcionarioForm!: FormGroup;
  fotoPreview!: string | ArrayBuffer | null;
  stream!: MediaStream | null;
  cameraAtiva = false;

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  constructor(private _formBuilder: FormBuilder, private _router: Router) {}

  ngOnInit() {
    this.funcionarioForm = this._formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      cpf: ['', [Validators.required, cpfValidator]],
      cargo: ['', Validators.required],
      dataAdmissao: [new Date(), Validators.required],
      foto: [null],
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.fotoPreview = reader.result);
      reader.readAsDataURL(file);
      this.funcionarioForm.patchValue({ foto: file });
    }
  }

  async abrirCamera(): Promise<void> {
    try {
      this.cameraAtiva = true;
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.video && this.video.nativeElement) {
        this.video.nativeElement.srcObject = this.stream;
        this.video.nativeElement.play();
      }
    } catch (err) {
      Swal.fire('Erro', 'Não foi possível acessar a câmera.', 'error');
      this.cameraAtiva = false;
    }
  }

  tirarFoto(): void {
    if (!this.video?.nativeElement) return;

    const videoEl = this.video.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

    this.fotoPreview = canvas.toDataURL('image/png');
    this.funcionarioForm.patchValue({ foto: this.fotoPreview });
    this.fecharCamera();
  }

  fecharCamera(): void {
    this.cameraAtiva = false;
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }

  salvar(): void {
    if (this.funcionarioForm.invalid) {
      this.funcionarioForm.markAllAsTouched();
      Swal.fire(
        'Campos obrigatórios',
        'Preencha todos os campos corretamente.',
        'warning'
      );
      return;
    }

    const novoFuncionario = this.funcionarioForm.value;

    Swal.fire({
      title: 'Funcionário cadastrado!',
      text: `${novoFuncionario.nome} foi adicionado com sucesso.`,
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then(() => {
      this._router.navigate(['/system/funcionarios']);
    });
  }

  cancelar(): void {
    this._router.navigate(['/system/funcionarios']);
  }
}
