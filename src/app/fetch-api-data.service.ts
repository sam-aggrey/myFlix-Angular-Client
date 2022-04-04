import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';
import { Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// delcaring the api url that will rpovide data for the client app
const apiUrl = 'https://sammy-flix.herokuapp.com/';
// Get token from local storage for requests
const token = localStorage.getItem('token');
// Get username from localStorage for URLs
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(private http: HttpClient, private router: Router) { }

  //User Registration

/**
 *  API endpoint to register a new user
 * @function userRegistration
 * @param userDetails
 * @returns a new user object in JSON format
 */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User Login
  /**
 * calls API endpoint for user login
 * @function userLogin
 * @param userDetails
 * @returns a users' data in JSON format
 */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get All Movies
  /**
 * calls API endpoint to get all movies
 * @function getAllMovies
 * @returns an array of the movies object in JSON format
 */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get a Single Movie

/**
 * calls API endpoint for getting a single movie
 * @function getOneMovie
 * @param Title
 * @returns a movie object in JSON format
 */
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:movieId', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get Director
  /**
 * calls the API endpoint to get director info by  name
 * @function getDirector
 * @param Name
 * @returns directors' data in JSON format
 */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get Genre

/**
 * calls API endpoint to get Genre data by  name
 * @function getGenre
 * @param Name
 * @returns genre data in JSON format
 */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get User by username
  /**
 * calls API endpooint to get a users' data
 * @function getUser
 * @param Username
 * @returns user data in JSON format
 */
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get Favorite Movies
  /**
 * calls API endpoint to get the favorite movie list of a user
 * @function getFavMovie
 * @param MovieID
 * @returns a list of the users' favorite movies in JSON format
 */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get(apiUrl + `users/${username}/movies`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add a movie to user favorite

/**
 * calls API endpooint to add a movie to a users' favorite movie list
 * @function addFavMovie
 * @param Title
 * @param MovieID
 * @returns the updated users' favorite list in JSON format
 */
  addFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}/movies/:movieId`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Remove a movie from user favorite
  /**
 * calls API endpoint to delete a movie from the users' favorite list
 * @function deleteFavMovie
 * @param Title
 * @param MovieID
 * @returns updated user info after removal of a fav movie
 */
  deleteFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/:movieId`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Update User Profile

/**
 * call API endpoint to edit user details
 * @param userData
 * @returns updated user information in JSON format
 */
  editUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete User Profile
  /**
 * call API endpoint to delete a user
 * @function deleteUserProfile
 * @param Username
 * @returns delete status
 */
  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Extract data response
  /**
 * Error function
 * @function handleError
 * @param error
 * @returns error call
 */
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  // Handle error function
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Something went wrong; please try again later.');
  }
}
