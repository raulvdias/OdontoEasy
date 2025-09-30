import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../common/institucional/nav/nav.component';

@Component({
  selector: 'app-institucional',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './institucional.component.html',
  standalone: true,
})
export class InstitucionalComponent {}
