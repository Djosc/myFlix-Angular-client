import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router, public snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  logOutUser(): void {
    this.snackBar.open('Successfully logged out', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']).then(() => {
      window.location.reload();
    });
  }
}
