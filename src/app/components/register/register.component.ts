import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUser, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  passwd!: string;

  constructor(
    private _builder: FormBuilder,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.blankForm();
  }

  blankForm(): void {
    this.registerForm = this._builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [null, Validators.required],
    })
  }

  registerUser(): void {
    let user: NewUser = this.registerForm.value;
    this._userService.CreateUser(user);
    this.blankForm();
  }

}
