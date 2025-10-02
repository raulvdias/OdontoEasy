import { NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, MatButtonModule, NgIf, MatIconModule],
  templateUrl: './nav.component.html',
  standalone: true,
})
export class NavComponent implements OnInit {
  screenSize: boolean = window.innerWidth > 1000;
  isOpened = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenSize = event.target.innerWidth > 1000;

    if (this.screenSize) {
      this.isOpened = false;
    }
  }

  ngOnInit(): void {}

  openClose() {
    this.isOpened = !this.isOpened;

    document.querySelectorAll('body').forEach((body) => {
      body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('html').forEach((html) => {
      html.classList.toggle('no-scroll');
    });
  }
}
