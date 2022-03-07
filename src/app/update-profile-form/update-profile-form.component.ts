import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.scss'],
})
export class UpdateProfileFormComponent implements OnInit {
  user: any = {};

  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  };

  constructor(
    public fetchApi: UserRegistrationService,
    public dialogRef: MatDialogRef<UpdateProfileFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Calls getSingleUser api service function and stores the response in this.user.
   */
  getUser(): void {
    this.fetchApi.getSingleUser().subscribe((resp: any) => {
      this.user = resp;
    });
  }

  /**
   * Calls the editUserProfile api service function with the userData stored in this component.
   * Local storage is then updated, snackbar displays a success message and the page is
   * reloaded to reflect the changes.
   */
  updateUser(): void {
    this.fetchApi.editUserProfile(this.userData).subscribe((resp: any) => {
      this.dialogRef.close();

      localStorage.setItem('user', this.userData.Username);

      this.snackBar.open('Your profile was successfully updated.', 'OK', {
        duration: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }
}
