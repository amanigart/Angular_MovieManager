import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { API_URL } from './api.injectables';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser?: User;


  constructor(
    private _http: HttpClient) {}

  login(email: string, passwd: string) {
    this._http.post<User>(API_URL +'auth/auth', { "email": email, "password": passwd }).subscribe({
      next: (user: User) => {
        this.currentUser = user;
        localStorage.setItem('token', user.token);
        localStorage.setItem('isAdmin', user.isAdmin.toString());
        localStorage.setItem('firstName', user.firstName);
      },
      error: (error) => console.log(error)
    });
  }

  logout() {
    this.currentUser = undefined;
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    const jwt = new JwtHelperService();
    const token = localStorage.getItem('token') || undefined;

    return !jwt.isTokenExpired(token);
  }
}
