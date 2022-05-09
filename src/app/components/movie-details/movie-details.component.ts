import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Movie } from 'src/app/models/movie.model';
import { User, UserForComments } from 'src/app/models/user.model';
import { CommentService } from 'src/app/services/comment.service';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie!: Movie;
  comments!: Comment[];
  subscriptions!: Subscription[];
  userIds: number[] = [];
  users: UserForComments[] = [];

  constructor(
    private _movieService: MovieService,
    private _router: ActivatedRoute,
    private _commentService: CommentService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    const id: number = this._router.snapshot.params['id'];

    // Recherche du film à partie de son id
    this._movieService.getMovieById(id).subscribe({
      next: (movie: Movie) => this.movie = movie,
      error: (error) => console.log(error)
    });

    // recherche des commentaires à partir de l'id du film
    this._commentService.getMovieComments(id)?.subscribe({
      next: (comments: Comment[]) => {
        this.comments = comments;
        this.comments.forEach(u => this.userIds.push(u.userID));
      },
      error: (error) => console.log(error)
    });

    // Recherche les utilisateurs qui ont commenté à partir de leur id
    this.userIds.forEach(id => this._userService.getUserInfosForComments(id).subscribe({
      next: (user: UserForComments) => {this.users.push(user); console.log(this.users);}
    }))



    // this.subscriptions.push(this._movieService.getMovieById(id).subscribe({
    //   next: (movie: Movie) => this.movie = movie,
    //   error: (error) => console.log(error)
    // }));

    // this.subscriptions.push(this._commentService.getMovieComments(id)?.subscribe({
    //   next: (comments: Comment[]) => this.comments = comments,
    //   error: (error) => console.log(error)
    // }));
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length)
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
