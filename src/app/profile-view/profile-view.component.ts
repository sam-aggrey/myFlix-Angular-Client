import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = localStorage.getItem('username');
  favs: any = null;

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  /**
   * Gets user profile when the page is opened
   */
  ngOnInit(): void {
    this.getCurrentUser();
  }

  /**
   * Gets user info from backend
   */
   getCurrentUser(): void {
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      this.user = resp;
      this.favs = resp.Favorites;
      console.log(this.user)
      return (this.user, this.favs);
    });
  }

  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(DescriptionCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
  }
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }
  openDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px'
    });
  }


  /**
   * Opens dialog to edit user information
   */
  openEditUserProfile(): void {
    this.dialog.open(UserEditComponent, {
      width: '500px'
    });
  }

  // filter out the movies that aren't favs
    getFavs(): void {
     let movies: any[] = [];
     this.fetchApiData.getAllMovies().subscribe((res: any) => {
       movies = res;
       movies.forEach((movie: any) => {
         if (this.user.favorites.includes(movie._id)) {
           this.favs.push(movie);
         }
       });
     });
     return this.favs;
   }

  /**
   * Allows user to remove movie from favs
   * @param id
   */
  removeFav(id: string): void {
    this.fetchApiData.deleteFavoriteMovies().subscribe((res: any) => {
      this.snackBar.open('Successfully removed from favorite movies.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      return this.favs;
    })
  }

  /**
   * Allows user to delete their profile
   * Re-routes to the welcome page
   */
  deleteProfile(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account was deleted', 'OK', {duration: 6000});
      });
      this.router.navigate(['welcome'])
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        localStorage.clear();
      });
    }
  }

}
