import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
selector: 'app-user-profile',
templateUrl: './user-profile.component.html',
styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
user: any = {};
movies: any = [];
Username = localStorage.getItem('user');
Movie = localStorage.getItem('movie');

FavMovies: any = [];

constructor(
public fetchApiData: FetchApiDataService,
public snackBar: MatSnackBar,
public dialog: MatDialog,
public router: Router
) {}

ngOnInit(): void {

}

/**
call API end-point to get the user's information
@function getUser
@param Username
@return user's data in json format */
/**
get user's FavoriteMovies from the user's data */ getFavoriteMovies(): void { this.movies.forEach((movie: any) => { if (this.user.FavoriteMovies.includes(movie._id)) { this.FavMovies.push(movie); } }); return this.FavMovies; }


/**
retrieve all favorited movies */ getMovies(): void { this.fetchApiData.getAllMovies().subscribe((res: any) => { this.movies = res; this.getFavoriteMovies(); }); }
} 
