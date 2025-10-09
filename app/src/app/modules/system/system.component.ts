import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../common/system/nav/nav.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-system',
  imports: [RouterOutlet, NavComponent, MatSidenavModule, MatIconModule, NgIf],
  templateUrl: './system.component.html',
})
export class SystemComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isMobile = false;
  sidenavOpened = true;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth < 1024; // breakpoint lg
    this.sidenavOpened = !this.isMobile;
  }

  toggleSidenav() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.sidenavOpened = this.sidenav.opened;
    }
  }
}
