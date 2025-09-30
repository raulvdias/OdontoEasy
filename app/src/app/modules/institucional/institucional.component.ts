import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../common/institucional/nav/nav.component';
import { FooterComponent } from '../../common/institucional/footer/footer.component';

@Component({
  selector: 'app-institucional',
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './institucional.component.html',
  standalone: true,
})
export class InstitucionalComponent {}
