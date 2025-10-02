import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'OdontoEasy';
  screenSize = window.innerWidth > 1000;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenSize = event.target.innerWidth > 1000;

    let bodyHasNoScroll = false;
    let htmlHasNoScroll = false;

    if (this.screenSize) {
      document.querySelectorAll('body').forEach((body) => {
        if (body.classList.contains('no-scroll')) {
          bodyHasNoScroll = true;
        }
      });

      document.querySelectorAll('html').forEach((html) => {
        if (html.classList.contains('no-scroll')) {
          htmlHasNoScroll = true;
        }
      });
    }

    if (
      (this.screenSize && bodyHasNoScroll) ||
      (this.screenSize && htmlHasNoScroll)
    ) {
      document.querySelectorAll('body').forEach((body) => {
        body.classList.remove('no-scroll');
      });

      document.querySelectorAll('html').forEach((html) => {
        html.classList.remove('no-scroll');
      });
    }
  }
}
