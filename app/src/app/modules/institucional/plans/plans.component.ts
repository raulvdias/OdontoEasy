import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fadeInDownBigOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-plans',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
  animations: [fadeInDownBigOnEnterAnimation({ translate: '150px' })],
  standalone: true,
})
export class PlansComponent {}
