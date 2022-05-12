import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { NewUser, User, UserForComments } from '../models/user.model';
import { API_URL } from './api.injectables';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private _roleSwitchEvent$: Subject<boolean> = new Subject();
  private _deleteUserEvent$: Subject<boolean> = new Subject();

  get roleSwitchEvent$(): Observable<boolean>{
    return this._roleSwitchEvent$.asObservable();
  };
  get deleteUserEvent$(): Observable<boolean> {
    return this._deleteUserEvent$.asObservable();
  }

  constructor(private _httpClient: HttpClient) { }

  CreateUser(user: NewUser): void {
    this._httpClient.post(API_URL +'User/register', user, {responseType: 'text'}).subscribe({
      next: () => console.log(user),
      error: (error) => console.log(error)
    });
  };

  deleteUser(id: number): void {
    console.log(id);
    this._httpClient.delete(API_URL + 'User?id=' + id).subscribe({
      next: () => this._deleteUserEvent$.next(true),
      error: (error) => this._deleteUserEvent$.next(false)
    })
  };

  getAllusers(): Observable<User[]> {
    return this._httpClient.get<User[]>(API_URL + 'User');
  };

  getUserById(id: number): Observable<User> {
    return this._httpClient.get<User>(API_URL + `User/${id}`);
  };

  getUserInfosForComments(id: number): Observable<UserForComments> {
    return this.getUserById(id).pipe(map((user: User) => ({id: user.id, lastName: user.lastName, firstName: user.firstName})));
  };

  updateRole(id: number): void {
    this._httpClient.put('http://localhost:53448/setAdmin/' + id, id).subscribe({
      next: () => this._roleSwitchEvent$.next(true),
      error: (error) => {
        this._roleSwitchEvent$.next(false);
        console.log(error);
      }
    })
  };
}
