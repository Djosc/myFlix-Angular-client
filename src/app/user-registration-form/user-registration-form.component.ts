import { Component, OnInit, Input } from '@angular/core';

// Used to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// For using API calls
import { UserRegistrationService } from '../fetch-api-data.service';

// Used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // For sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        // On succesful user registration
        // modal will close
        this.dialogRef.close();
        console.log(response);
        this.snackBar.open('User sucessfully registered', 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
