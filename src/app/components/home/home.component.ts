import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numberOfMovies!: number;
  numberOfPersons!: number;
  numberOfActors!: number;
  numberOfDirectors!: number;
  lastMovies!: Movie[];

  constructor(
    private _router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.numberOfMovies = this._router.snapshot.data['allMovies'].length;
    this.numberOfPersons = this._router.snapshot.data['allPersons'].length;
    this.lastMovies = this._router.snapshot.data['allMovies'].slice(-3).reverse();
  }

}
