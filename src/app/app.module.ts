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
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {EditorModule} from 'primeng/editor';
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
import { PanelComponent } from './components/admin/panel/panel.component';
import { CreateMovieComponent } from './components/admin/create-movie/create-movie.component';

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
    HomeComponent,
    PanelComponent,
    CreateMovieComponent
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
    CardModule,
    DropdownModule,
    CheckboxModule,
    EditorModule
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
