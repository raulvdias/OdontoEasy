import { NgOptimizedImage } from '@angular/common';
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
import { RouterLink } from '@angular/router';
import {
  fadeInRightBigOnEnterAnimation,
  fadeInLeftBigOnEnterAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    NgOptimizedImage,
  ],
  animations: [
    fadeInRightBigOnEnterAnimation({ translate: '250px', duration: 1500 }),
    fadeInLeftBigOnEnterAnimation({ translate: '250px', duration: 1500 }),
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
}
function faceInRightOnEnter(arg0: {
  translate: string;
  duration: number;
}): any {
  throw new Error('Function not implemented.');
}
