import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-steps-form',
  templateUrl: './steps-form.component.html',
  styleUrls: ['./steps-form.component.scss']
})
export class StepsFormComponent implements OnInit {
  steps!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.steps = [
      {label: 'Movie', routerLink: ['./new-movie']},
      {label: 'Director'},
      {label: 'Writer'},
      {label: 'Casting'}
    ]
  }

}
