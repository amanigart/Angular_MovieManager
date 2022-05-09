import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonDetails } from 'src/app/models/person-detail.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {
  currentPerson!: PersonDetails;

  constructor(
    private _personService: PersonService,
    private _router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentPerson = this._router.snapshot.data['currentPerson'];
  }

  toCapitalize(str: string) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

}
