import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovieToApi } from 'src/app/models/movie.model';
import { Person } from 'src/app/models/person.model';
import { MovieService } from 'src/app/services/movie.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit {
  creationForm!: FormGroup;
  newMovie!: MovieToApi;
  persons!: Person[];
  selectedPerson!: Person;

  constructor(
    private _movieService: MovieService,
    private _personService: PersonService,
    private _builder: FormBuilder,
    private _router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.persons = this._router.snapshot.data['people'];
    this.blankForm();
  }

  blankForm(): void {
    this.creationForm = this._builder.group({
      id: [null, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      releaseYear: [null, Validators.required],
      realisatorID: ['', Validators.required],
      scenaristID: [null, Validators.required]
    })
  }

  addMovie(): void {
    this.newMovie = this.creationForm.value;
    this._movieService.createMovie(this.newMovie);
    this.blankForm();
  }

}
