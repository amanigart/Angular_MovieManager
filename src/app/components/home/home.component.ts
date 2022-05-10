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
  lastMovies!: Movie[];

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.lastMovies = this._route.snapshot.data['allMovies'].slice(-3).reverse();
  }

}
