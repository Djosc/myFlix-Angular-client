import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) {}

  // This will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '400px',
    });
  }

  openLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '400px',
    });
  }
}
