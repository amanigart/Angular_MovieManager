import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMovieComponent } from './components/admin/create-movie/create-movie.component';
import { MembersComponent } from './components/admin/members/members.component';
import { MetricsComponent } from './components/admin/metrics/metrics.component';
import { PanelComponent } from './components/admin/panel/panel.component';
import { StepsFormComponent } from './components/admin/steps-form/steps-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { EnfantComponent } from './components/parent/enfant/enfant.component';
import { ParentComponent } from './components/parent/parent.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './resolvers/admin.guard';
import { AuthGuard } from './resolvers/auth.guard';
import { MovieResolver } from './resolvers/movie.resolver';
import { PersonListResolver } from './resolvers/person-list.resolver';
import { PersonResolver } from './resolvers/person.resolver';
import { UserListResolver } from './resolvers/user-list.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', resolve: {allMovies: MovieResolver}, component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'person', component: PersonListComponent },
  { path: 'person/:id', resolve: {currentPerson: PersonResolver}, canActivate: [AuthGuard], component: PersonDetailsComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', canActivate: [AuthGuard], component: MovieDetailsComponent },
  { path: 'admin', resolve: {allMovies: MovieResolver, allPersons: PersonListResolver, allUsers: UserListResolver}, canActivate: [AdminGuard], component: PanelComponent, children: [
    { path: 'metrics', resolve: {allMovies: MovieResolver, allPersons: PersonListResolver, allUsers: UserListResolver}, canActivate: [AdminGuard], component: MetricsComponent },
    { path: 'create-movie', resolve:{people: PersonListResolver}, canActivate: [AdminGuard], component: CreateMovieComponent},
    { path: 'users', canActivate: [AdminGuard], component: MembersComponent }
  ]},
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
