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
  movies: any[] = [];
  favIDs: any[] = [];
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

  /**
   * Calls getSingleUser api service function to store user data in the component state
   */
  getUserInfo(): void {
    this.fetchApi.getSingleUser().subscribe((resp: any) => {
      this.user = resp;
    });
    console.log(this.user);
  }

  /**
   * Calls getAllMovies and getFavoriteMovies and stores them in local state.
   * Then, the movie IDs from getFavoriteMovies are compared to the IDs in the movies array.
   * If they match, that movie object is stored in the favoriteMovies array.
   * It is done like this because getFavoriteMovies only returns the IDs and...
   *  the full movie object is needed
   */
  getFavoriteMovies(): void {
    this.fetchApi.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;

      this.fetchApi.getFavoriteMovies().subscribe((resp: any) => {
        this.favIDs = resp.FavoriteMovies;
        this.movies.forEach((movie) => {
          if (this.favIDs.some((id) => id === movie._id)) {
            this.favoriteMovies.push(movie);
          }
        });
        console.log(this.favoriteMovies);
      });
    });
  }

  /**
   * Opens a dialog with the update profile form
   * @module UpdateProfileFormComponent
   */
  openEditProfileDialog(): void {
    this.dialog.open(UpdateProfileFormComponent, {
      width: '300px',
    });
  }

  /**
   * Confirms if the user wants to delete their profile, then calls deleteUserProfile api fucntion.
   * Snackbar displays a success message.
   * Local storage is then cleared and the router navigates back to the welcome screen.
   */
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

  /**
   * Removes a favorite movie from the user's favorite list. ngOnInit is called to update
   *  the favoriteMovies array and the page is reloaded to display the changes.
   * @param movieID
   * @param title
   */
  removeFavorite(movieID: string, title: string): void {
    this.fetchApi.deleteFavoriteMovie(movieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favorites.`,
        'OK',
        {
          duration: 2000,
        }
      );
      this.ngOnInit();
      window.location.reload();
    });
  }
}
