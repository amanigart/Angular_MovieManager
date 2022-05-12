import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment, CommentToApi } from 'src/app/models/comment.model';
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
  currentuserId!: number;
  currentMovieId!: number;
  currentMovie!: Movie;
  newComment!: CommentToApi;
  comments?: Comment[] = [];
  subscriptions = new Subscription();
  newMessageEventSubscription!: Subscription;
  deleteCommentSubscription!: Subscription;
  isAdminEventSubscription!: Subscription;
  isAdmin!: boolean;
  isNewComment!: boolean;
  isCommentDeleted!: boolean;
  userIds: number[] = [];
  users: UserForComments[] = [];
  commentForm!: FormGroup;

  constructor(
    private _movieService: MovieService,
    private _router: ActivatedRoute,
    private _commentService: CommentService,
    private _userService: UserService,
    private _authService: AuthService,
    private _builder: FormBuilder,
    private _datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') == 'true';

    this.isAdminEventSubscription = this._authService.isAdminEvent$.subscribe({
      next: (isAdminState) => {
        this.isAdmin = isAdminState;
      }
    });

    this.currentMovieId = parseInt(this._router.snapshot.params['id']);

    this.newMessageEventSubscription = this._commentService.newCommentEvent$.subscribe({
      next: isNewComment => {
        if (isNewComment) this.loadComments()
      }
    });

    this.deleteCommentSubscription = this._commentService.deleteCommentEvent$.subscribe({
      next: isCommentDeleted => {
        if (isCommentDeleted) this.loadComments()
      }
    });

    this.subscriptions.add(
      // Recherche un film à partir de son id
      this._movieService.getMovieById(this.currentMovieId).subscribe({
        next: (movie: Movie) => this.currentMovie = movie,
        error: (error) => console.log(error)
      })
    );

    this.loadComments();

    this.subscriptions.add(
      // Recherche les utilisateurs qui ont commenté à partir de leur id
      this.userIds.forEach(id => this._userService.getUserInfosForComments(id).subscribe({
        next: (user: UserForComments) => {
          this.users.push(user);
          console.log(this.users);
        }
      }))
    );

    this.blankForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  isAuth(): boolean {
    return this._authService.isAuthenticated();
  }

  blankForm(): void {
    this.commentForm = this._builder.group({
      content: ['']
    });
  }

  loadComments(): void {
    this.subscriptions.add(
      // recherche des commentaires à partir de l'id du film
      this._commentService.getMovieComments(this.currentMovieId).subscribe({
        next: (comments: Comment[]) => {
          this.comments = comments;
          this.comments.forEach(u => this.userIds.push(u.userID));
        },
        error: (error) => console.log(error)
      })
    );
  }

  postComment(): void {
    const dateToSQL: string = this._datepipe.transform(new Date(), 'yyyy-MM-dd')!;

    this.newComment = {
      id: undefined,
      content: this.commentForm.value['content'],
      postDate: dateToSQL,
      userID: parseInt(localStorage.getItem('userID')!),
      movieID: this.currentMovieId
    }

    this._commentService.createComment(this.newComment);
    this.blankForm();
  }

  deleteComment(id: number): void {
    this._commentService.deleteComment(id);
  }

}
