import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonDetails } from '../models/person-detail.model';
import { Person } from '../models/person.model';
import { ActorToApi } from '../models/actor.model';
import { API_URL } from './api.injectables';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _http: HttpClient) { }

  getAllPersons(): Observable<Person[]> {
    return this._http.get<Person[]>(API_URL + 'Person');
  }

  getPersonById(id: number): Observable<Person> {
    return this._http.get<Person>(API_URL + `Person/${id}`);
  }

  setActor(actor: ActorToApi): void {
    this._http.post(API_URL + 'Person/setActor', actor).subscribe({
      next: () => console.log('ok'),
      error: (error) => console.log(error)
    });
  }

}
