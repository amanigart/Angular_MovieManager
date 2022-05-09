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
export class PersonResolver implements Resolve<Person> {
  constructor(private _service: PersonService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Person> {
    const id = route.params['id'];
    return this._service.getPersonById(id);
  }
}
