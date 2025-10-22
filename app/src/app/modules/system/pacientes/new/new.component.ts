import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  DestroyRef,
  inject,
} from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';
import { PacientesService } from '../pacientes.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-new',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    NgIf,
    MatInputModule,
    MatButtonModule,
    NgxMaskDirective,
    MatTooltipModule,
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  pacienteForm!: FormGroup;
  fotoPreview!: string | ArrayBuffer | null;
  stream!: MediaStream | null;
  cameraAtiva = false;

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _pacientesService: PacientesService
  ) {}

  ngOnInit() {
    this.pacienteForm = this._formBuilder.group({
      nome: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, cpfValidator]],
      cep: ['', Validators.required],
      dataCadastro: [new Date(), Validators.required],
      planoOdonto: ['', Validators.required],
      foto: [null],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.fotoPreview = reader.result);
      reader.readAsDataURL(file);
      this.pacienteForm.patchValue({ foto: file });
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
      console.error(err);
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
    this.pacienteForm.patchValue({ foto: this.fotoPreview });
    this.fecharCamera();
  }

  fecharCamera(): void {
    this.cameraAtiva = false;
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }

  viacep() {
    setTimeout(() => {
      this._pacientesService
        .cepService(this.pacienteForm.value.cep)
        .subscribe((end: any) => {
          this.pacienteForm.patchValue({
            rua: end.logradouro,
            bairro: end.bairro,
            cidade: end.localidade,
            estado: end.estado,
          });
        });
    }, 500);
  }

  salvar(): void {
    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched();
      Swal.fire(
        'Campos obrigatórios',
        'Preencha todos os campos corretamente.',
        'warning'
      );
      return;
    }

    const novoPaciente = this.pacienteForm.value;

    Swal.fire({
      title: 'Paciente cadastrado!',
      text: `${novoPaciente.nome} foi adicionado com sucesso.`,
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then(() => {
      this._router.navigate(['/system/pacientes']);
    });
  }

  cancelar(): void {
    this._router.navigate(['/system/pacientes']);
  }
}
