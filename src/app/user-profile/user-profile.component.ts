import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { UpdateProfileFormComponent } from '../update-profile-form/update-profile-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public fetchApi: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getFavoriteMovies();
  }

  getUserInfo(): void {
    this.fetchApi.getSingleUser().subscribe((resp: any) => {
      this.user = resp;
    });
    console.log(this.user);
  }

  getFavoriteMovies(): void {
    this.fetchApi.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      console.log(this.favoriteMovies);
    });
  }

  openEditProfileDialog(): void {
    this.dialog.open(UpdateProfileFormComponent, {
      width: '300px',
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.fetchApi.deleteUserProfile().subscribe((resp: any) => {
        this.snackBar.open(
          `${this.user.Username}'s profile has been deleted.`,
          'OK',
          {
            duration: 2000,
          }
        );
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }
  }
}
