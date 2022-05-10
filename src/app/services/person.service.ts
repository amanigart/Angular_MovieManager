import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonDetails } from '../models/person-detail.model';
import { Person } from '../models/person.model';
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

}
