import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { GenreCardComponent } from './genre-card/genre-card.component';
import { SynopsisCardComponent } from './synopsis-card/synopsis-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DirectorCardComponent } from './director-card/director-card.component';
import { DescriptionCardComponent } from './description-card/description-card.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
  { path: 'profile', component: ProfileViewComponent },
];

@NgModule({
declarations: [
AppComponent,
UserRegistrationFormComponent,
UserLoginFormComponent,
MovieCardComponent,
WelcomePageComponent,
GenreCardComponent,
SynopsisCardComponent,
NavbarComponent,
DirectorCardComponent,
DescriptionCardComponent,
ProfileViewComponent,
UserEditComponent,


],
imports: [
BrowserModule,
AppRoutingModule,
BrowserAnimationsModule,
MatCardModule,
MatFormFieldModule,
MatDialogModule,
FormsModule,
MatIconModule,
HttpClientModule,
MatSnackBarModule,
MatInputModule,
MatButtonModule,
RouterModule.forRoot(appRoutes)

],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
