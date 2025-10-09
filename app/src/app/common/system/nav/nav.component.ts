import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-system',
  imports: [RouterLink, MatIconModule, MatMenuModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  ngOnInit(): void {}
}
