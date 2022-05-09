import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './resolvers/auth.guard';
import { MovieResolver } from './resolvers/movie.resolver';
import { PersonResolver } from './resolvers/person.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'person', component: PersonListComponent },
  { path: 'person/:id', resolve: { currentPerson: PersonResolver }, canActivate: [AuthGuard], component: PersonDetailsComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', canActivate: [AuthGuard], component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
