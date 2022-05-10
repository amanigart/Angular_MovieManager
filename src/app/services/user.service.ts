import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NewUser, User, UserForComments } from '../models/user.model';
import { API_URL } from './api.injectables';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  CreateUser(user: NewUser): void {
    this._httpClient.post(API_URL +'USer/register', user, {responseType: 'text'}).subscribe({
      next: () => console.log(user),
      error: (error) => console.log(error)
    });
  }

  getUserById(id: number): Observable<User> {
    return this._httpClient.get<User>(API_URL + `User/${id}`);
  }

  getUserInfosForComments(id: number): Observable<UserForComments> {
    return this.getUserById(id).pipe(map((user: User) => ({id: user.id, lastName: user.lastName, firstName: user.firstName})));
  }
}
