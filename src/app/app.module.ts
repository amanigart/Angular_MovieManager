import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common'
// Imports PrimeNg
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {EditorModule} from 'primeng/editor';
import {PanelModule} from 'primeng/panel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {PasswordModule} from 'primeng/password';
import {StepsModule} from 'primeng/steps';
import {AccordionModule} from 'primeng/accordion';
import {DividerModule} from 'primeng/divider';
import {ChartModule} from 'primeng/chart';
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
import { MetricsComponent } from './components/admin/metrics/metrics.component';
import { MembersComponent } from './components/admin/members/members.component';
import { MenuComponent } from './components/admin/menu/menu.component';
import { CreateUserComponent } from './components/admin/create-user/create-user.component';
import { ParentComponent } from './components/parent/parent.component';
import { EnfantComponent } from './components/parent/enfant/enfant.component';
import { StepsFormComponent } from './components/admin/steps-form/steps-form.component';
import { ChartsComponent } from './components/admin/metrics/charts/charts.component';
import { CreatePersonComponent } from './components/admin/create-person/create-person.component';
import { SetActorComponent } from './components/admin/set-actor/set-actor.component';

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
    CreateMovieComponent,
    MetricsComponent,
    MembersComponent,
    MenuComponent,
    CreateUserComponent,
    ParentComponent,
    EnfantComponent,
    StepsFormComponent,
    ChartsComponent,
    CreatePersonComponent,
    SetActorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // PrimeNg
    ButtonModule,
    InputTextModule,
    MenubarModule,
    MenuModule,
    TableModule,
    CardModule,
    DropdownModule,
    CheckboxModule,
    EditorModule,
    PanelModule,
    SelectButtonModule,
    InputSwitchModule,
    PasswordModule,
    StepsModule,
    AccordionModule,
    DividerModule,
    ChartModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
