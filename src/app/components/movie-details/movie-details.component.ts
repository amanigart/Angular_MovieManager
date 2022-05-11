import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Movie } from 'src/app/models/movie.model';
import { User, UserForComments } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
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
  commentsIds!: number[];
  subscriptions = new Subscription();
  userIds: number[] = [];
  users: UserForComments[] = [];
  commentForm!: FormGroup;

  constructor(
    private _movieService: MovieService,
    private _router: ActivatedRoute,
    private _commentService: CommentService,
    private _userService: UserService,
    private _authService: AuthService,
    private _builder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Va rechercher les ids de commentaires pour connaître l'ID max
    // const commentsIds =

    const id: number = this._router.snapshot.params['id'];

    this.subscriptions.add(
      // Recherche du film à partie de son id
      this._movieService.getMovieById(id).subscribe({
        next: (movie: Movie) => this.movie = movie,
        error: (error) => console.log(error)
      })
    );

    this.subscriptions.add(
      // recherche des commentaires à partir de l'id du film
      this._commentService.getMovieComments(id)?.subscribe({
        next: (comments: Comment[]) => {
          this.comments = comments;
          this.comments.forEach(u => this.userIds.push(u.userID));
        },
        error: (error) => console.log(error)
      })
    );

    this.subscriptions.add(
      // Recherche les utilisateurs qui ont commenté à partir de leur id
      this.userIds.forEach(id => this._userService.getUserInfosForComments(id).subscribe({
        next: (user: UserForComments) => {this.users.push(user); console.log(this.users);}
      }))
    );

    this.blankForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  blankForm(): void {
    this.commentForm = this._builder.group({
      content: ['', Validators.required]
    });
  }

  isAuth(): boolean {
    return this._authService.isAuthenticated();
  }

  postComment(): void {
  }

}
