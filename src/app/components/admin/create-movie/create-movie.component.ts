import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ActorToApi } from 'src/app/models/actor.model';
import { MovieDropDown, MovieToApi } from 'src/app/models/movie.model';
import { Person } from 'src/app/models/person.model';
import { MovieService } from 'src/app/services/movie.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
  providers: [MessageService]
})
export class CreateMovieComponent implements OnInit {
  createSuccessSubscription!: Subscription;
  isMovieCreated!: boolean;
  creationForm!: FormGroup;
  actorForm!: FormGroup;
  movies: MovieDropDown[] = [];
  selectedMovie!: MovieDropDown;
  newMovie!: MovieToApi;
  directorsIds: number[] = [];
  directors: Person[] = [];
  selectedDirector!: Person;
  persons!: any[];
  selectedWriter!: Person;
  selectedActor!: Person;
  newActor!: ActorToApi;

  constructor(
    private _movieService: MovieService,
    private _personService: PersonService,
    private _builder: FormBuilder,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.createSuccessSubscription = this._movieService.createOperationSuccessful.subscribe({
      next: (movieCreated) => {
        if (movieCreated) {
          this.isMovieCreated = movieCreated;
          this.getMovies();
        }
      }
    });
    this.getMovies();
    this.getPersons();
    this.blankMovieForm();
    this.blankActorForm();
  }

  movieCreatedToast() {
    this._messageService.add({severity:'success', summary:'New Movie !', detail: 'The movie has been correctly added to the databse.'});
  }
  actorCreatedToast() {
    this._messageService.add({severity:'info', summary:'New Role !', detail: 'The actor has been correctly linked to the movie.'});
  }

  blankMovieForm(): void {
    this.creationForm = this._builder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      releaseYear: [null, Validators.required],
      realisatorID: [null, Validators.required],
      scenaristID: [null, Validators.required]
    })
  }

  blankActorForm(): void {
    this.actorForm = this._builder.group({
      role: ['', Validators.required],
      movieId: [null, Validators.required],
      personId: [null, Validators.required]
    })
  }

  addMovie(): void {
    this.newMovie = {
      id: 0,
      title: this.creationForm.value['title'],
      description: this.creationForm.value['description'],
      releaseYear: this.creationForm.value['releaseYear'],
      realisatorID: this.creationForm.value['realisatorID'],
      scenaristID: this.creationForm.value['scenaristID'],
    }
    this._movieService.createMovie(this.newMovie);
    this.blankMovieForm();
    this.movieCreatedToast();
  }

  addActor(): void {
    this.newActor = {
      id: 0,
      role: this.actorForm.value['role'],
      personId: this.actorForm.value['personId'],
      movieId: this.actorForm.value['movieId']
    }
    this._personService.setActor(this.newActor);
    this.blankActorForm();
    this.actorCreatedToast();
  }

  getMovies(): void{
    this._movieService.getAllMovies().subscribe({
      next: (movies) => {
        this.movies = movies.map(movie => ({"id": movie.id, "title": movie.title}));
        // let movies = movies.map(movie => ({"id": movie.id, "title": movie.title}));
      }
    })
  }

  getPersons(): void {
    this._personService.getAllPersons().subscribe({
      next: (people) => {
        this.persons = people.map(p => ({"id": p.id, "name": p.firstName + ' ' + p.lastName}))
      }
    })
  }



}
