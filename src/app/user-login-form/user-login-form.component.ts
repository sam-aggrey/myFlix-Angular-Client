/**
 * The UserLoginFormComponent is used to render a mat dialog containing a form where the
 * user can submit their credentials to log in to myFlix.
 * @module UserLoginFormComponent
 */

 import { Component, OnInit } from '@angular/core';
 import { MatDialogRef } from '@angular/material/dialog';
 // Used to access the loginUser function created on this service
 import { FetchApiDataService } from '../fetch-api-data.service';
 import { MatSnackBar } from '@angular/material/snack-bar';
 // Used to navigate the user to the movies route on a successful login
 import { Router } from '@angular/router';


 @Component({
   selector: 'app-user-login-form',
   templateUrl: './user-login-form.component.html',
   styleUrls: ['./user-login-form.component.scss']
 })

 export class UserLoginFormComponent implements OnInit {

   loginData = { Username: '', Password: '' };

   constructor(
     public fetchApiData: FetchApiDataService,
     public dialogRef: MatDialogRef<UserLoginFormComponent>,
     public snackBar: MatSnackBar,
     public router: Router
   ) { }

   ngOnInit(): void {
    }


   userLogin(): void {
     this.fetchApiData.userLogin(this.loginData).subscribe((response) => {
       this.dialogRef.close();


      localStorage.setItem('password', this.loginData.Password);
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
      console.log(response);
      this.snackBar.open(`Hi ${this.loginData.Username}. You're logged in to myFlix!`, 'Cool!', { duration: 4000, panelClass: 'snack-style' });
      this.router.navigate(['movies']); // Navigates to the movies route
     },
      (response) => {
       console.log(response);
       this.snackBar.open(`Sorry ${this.loginData.Username} we couldn't log you in. Please check your username and password`, 'Ok',
         { duration: 4000, panelClass: 'snack-style' }
       );
     });
   }

 }
