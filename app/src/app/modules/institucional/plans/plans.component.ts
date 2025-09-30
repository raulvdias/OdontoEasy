import { Component } from '@angular/core';
import { fadeInDownBigOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-plans',
  imports: [],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
  animations: [fadeInDownBigOnEnterAnimation({ translate: '150px' })],
  standalone: true,
})
export class PlansComponent {}
