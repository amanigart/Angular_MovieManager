import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
  numberOfMovies!: number;
  numberOfPersons!: number;
  numberOfActors!: number;
  numberOfDirectors!: number;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.numberOfMovies = this._route.snapshot.data['allMovies'].length;
    this.numberOfPersons = this._route.snapshot.data['allPersons'].length;
  }

}
