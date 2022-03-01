import { Component, OnInit, Input } from '@angular/core';

// Used to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// For using API calls
import { UserRegistrationService } from '../fetch-api-data.service';

// Used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        this.dialogRef.close();
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
        // Add token and username to local storage variables
        // ! might add more than just username to local storage to improve upon the react version
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);

        this.router.navigate(['movies']);
      },
      (response) => {
        // console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
