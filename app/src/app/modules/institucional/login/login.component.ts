import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatIconModule,
    MatProgressSpinnerModule,
    NgOptimizedImage,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  isNewUser: Boolean = false;
  form!: FormGroup;
  formLogin!: FormGroup;
  isLoading: Boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: AuthService
  ) {}

  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  userLogin() {
    const { email, password } = this.formLogin.getRawValue();
    this._loginService.loginUser(email, password).subscribe((response: any) => {
      if (response.status != 'ERROR') {
        console.log(response);
      }
      return null;
    });
  }
}
