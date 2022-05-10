import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { API_URL } from './api.injectables';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _isAdminEvent$: Subject<boolean> = new Subject();
  private _isUserEvent$: Subject<boolean> = new Subject();

  get isAdminEvent$(): Observable<boolean> {
    return this._isAdminEvent$.asObservable();
  }
  get isUserEvent$(): Observable<boolean> {
    return this._isUserEvent$.asObservable();
  }

  constructor(private _http: HttpClient) {}

  login(email: string, passwd: string): void {
    this._http.post<User>(API_URL +'auth/auth', { "email": email, "password": passwd }).subscribe({
      next: (user: User) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('isAdmin', user.isAdmin.toString());
        localStorage.setItem('firstName', user.firstName);
        localStorage.setItem('userID', user.id.toString());
        this._isAdminEvent$.next(this.isAdmin())
        this._isUserEvent$.next(this.isAuthenticated())
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this._isAdminEvent$.next(false);
    this._isUserEvent$.next(false);
  }

  isAuthenticated(): boolean {
    const jwt = new JwtHelperService();
    const token = localStorage.getItem('token') || undefined;
    return !jwt.isTokenExpired(token);
  }

  isAdmin(): boolean {
    const admin = localStorage.getItem('isAdmin')
    return (admin == 'true');
  }
}
