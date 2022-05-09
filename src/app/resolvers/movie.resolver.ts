import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';


@Injectable({
  providedIn: 'root'
})

export class MovieResolver implements Resolve<Movie[]> {
  constructor(private _service: MovieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie[]> {
    return this._service.getAllMovies();
  }
}
