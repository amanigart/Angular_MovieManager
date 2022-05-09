import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Imports Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Imports HTTP
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Imports PrimeNg
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
// App Imports
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavComponent } from './components/nav/nav.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    MovieListComponent,
    MovieDetailsComponent,
    PersonListComponent,
    PersonDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // PrimeNg
    ButtonModule,
    InputTextModule,
    MenubarModule,
    TableModule,
    CardModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
