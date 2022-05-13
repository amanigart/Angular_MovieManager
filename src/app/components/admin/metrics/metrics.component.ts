import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Movie } from 'src/app/models/movie.model';
import { CommentService } from 'src/app/services/comment.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
  private _dataEvent$: Subject<any[]> = new Subject();

  get dataEvent$(): Observable<any[]> {
    return this._dataEvent$.asObservable();
  }

  numberOfMovies!: number;
  numberOfPersons!: number;
  numberOfUsers!: number;
  numberOfComments: number = 0;
  allMovies!: Movie[];
  allMoviesIds: number[] = [];
  allComments: Comment[] = [];
  allCommentsMetrics: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _commentService: CommentService,
    private _movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.numberOfMovies = this._route.snapshot.data['allMovies'].length;
    this.numberOfPersons = this._route.snapshot.data['allPersons'].length;
    this.numberOfUsers = this._route.snapshot.data['allUsers'].length;
    this.getAllMoviesIds();
    this.getAllComments();
  }

  getAllMoviesIds(): void {
    this.allMovies = this._route.snapshot.data['allMovies'];
    this.allMovies.forEach(movie => this.allMoviesIds.push(movie.id));
  }

  getAllComments() {
    this.allMoviesIds.forEach(
      id => this._commentService.getMovieComments(id).subscribe({
        next: (allComments) => {
          allComments.forEach(comment => {
            this.allComments.push(comment);
            this.numberOfComments++;
            this.allCommentsMetrics.push(allComments.map(com => ({"id": com.id, "postDate": com.postDate})));
          })
        }
      })
    );
  }

}
