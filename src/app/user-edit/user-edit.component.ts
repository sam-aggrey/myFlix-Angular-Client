import { Component, OnInit, Input } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  /**
   * Required fields tp update user info
   */
  @Input() userData = { Username: '', Password: '', Name: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Updates user details
   */
   editUserProfile(): void {
         this.fetchApiData.editUserProfile(this.userData).subscribe((resp) => {
           this.dialogRef.close();
           localStorage.setItem('user', resp.Username);
           this.snackBar.open('Profile  updated successfully.', 'OK', {
             duration: 2000
           });
           setTimeout(() => {
             window.location.reload();
           });
         });
       }
       closeDialog(): void {
         this.dialogRef.close();
       }

}
