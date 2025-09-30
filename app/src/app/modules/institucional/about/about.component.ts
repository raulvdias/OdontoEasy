import { Component } from '@angular/core';
import { fadeInUpBigOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [
    fadeInUpBigOnEnterAnimation({ translate: '150px', duration: 1500 }),
  ],
  standalone: true,
})
export class AboutComponent {}
