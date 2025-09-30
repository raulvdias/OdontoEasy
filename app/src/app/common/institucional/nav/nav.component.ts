import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './nav.component.html',
  standalone: true,
})
export class NavComponent {}
