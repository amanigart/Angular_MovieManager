import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import {TableModule} from 'primeng/table';
import { Person } from 'src/app/models/person.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, OnDestroy {
  persons!: Person[];
  currentId!: number;
  subscription!: Subscription;

  constructor(
    private _personService: PersonService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscription = this._personService.getAllPersons().subscribe({
      next: (data: Person[]) => this.persons = data,
      error: (error) => console.log(error)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  isAuth(): boolean {
    return this._authService.isAuthenticated();
  }

}
