import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  passwd!: string;

  constructor(
    private _builder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.blankForm();
  }

  blankForm() {
    this.loginForm = this._builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this._authService.login(this.loginForm.value['email'], this.loginForm.value['password'])
    this.blankForm();
    this._router.navigate(['/home']);
  }

}
