import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Person } from '../models/person.model';
import { PersonService } from '../services/person.service';

@Injectable({
  providedIn: 'root'
})
export class PersonListResolver implements Resolve<Person[]> {
  constructor(private _service: PersonService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Person[]> {
    return this._service.getAllPersons();
  }
}
