import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { routes } from './app.routes';
import { environment } from './environment';
import { provideHttpClient } from '@angular/common/http';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideHttpClient(),
    provideAuth(() => getAuth()),
    provideNativeDateAdapter(),
  ],
};
