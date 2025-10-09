import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, lastValueFrom, Observable } from 'rxjs';
import { environment } from '../environment';
import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  private _session: BehaviorSubject<any> = new BehaviorSubject(null);
  private _user: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {
    this.restoreSession();
  }

  set saveSession(data: any) {
    sessionStorage.setItem('uid', JSON.stringify(data));
    this._session.next(data);
  }

  createUser(form: any): Observable<any> {
    return this._httpClient.post(`${environment.api}/register`, {
      data: form,
    });
  }

  loginUser(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    )
      .then(async (userCredential) => {
        const user = userCredential.user;
        this.saveSession = user.uid;

        // await lastValueFrom(this._usersService.getUser(user.uid)).then(
        //   (response: any) => {
        //     this.user = response.data;
        //   }
        // );

        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        return 'ERROR';
      });

    return from(promise);
  }

  restoreSession() {
    let sessao = sessionStorage.getItem('uid');

    if (!sessao) {
      return;
    }

    this._session.next(JSON.parse(sessao));
  }

  isLogged() {
    return this._session.value !== null;
  }

  cleanSession() {
    sessionStorage.clear();
    localStorage.clear();
    this._session.next(null);
    this._user.next(null);
  }
}
