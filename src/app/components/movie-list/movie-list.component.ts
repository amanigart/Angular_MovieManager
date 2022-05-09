import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, Observable, Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies!: Movie[];
  subscription!: Subscription;

  constructor(
    private _movieService: MovieService,
    private _authService: AuthService
    // private _router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this._movieService.getAllMovies().subscribe({
      next: (movieList: Movie[]) => this.movies = movieList,
      error: (error) => console.log(error)
    });
    // this.movies = this._router.snapshot.data['movies'];
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  isAuth(): boolean {
    return this._authService.isAuthenticated();
  }

}
