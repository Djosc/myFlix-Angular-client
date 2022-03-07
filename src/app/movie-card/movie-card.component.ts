import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApi: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Calls the getAllMovies api service function and stores the response data in a local array.
   */
  getMovies(): void {
    this.fetchApi.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Calls the getFavoriteMovies api service function and stores the response in a local array.
   */
  getFavoriteMovies(): void {
    this.fetchApi.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      console.log(this.favoriteMovies);
    });
  }

  /**
   * Opens a dialog displaying the genre info
   * @param name
   * @param description
   * @module GenreCardComponent
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name: name, description: description },
      width: '300px',
    });
  }

  /**
   * Opens a dialog displaying the director's info. Also formats the dates.
   * @param name
   * @param bio
   * @param birth
   * @param death
   * @module DirectorCardComponent
   */
  openDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string
  ): void {
    const formattedBirth = formatDate(birth, 'mediumDate', 'en-US');
    const formattedDeath = formatDate(death, 'mediumDate', 'en-US');

    this.dialog.open(DirectorCardComponent, {
      data: {
        name: name,
        bio: bio,
        birth: formattedBirth,
        death: death === null ? 'N/A' : formattedDeath,
      },
      width: '300px',
    });
  }

  /**
   * Opens a dialog displaying the movie description
   * @param description
   * @module DescriptionCardComponent
   */
  openDescriptionDialog(description: string): void {
    this.dialog.open(DescriptionCardComponent, {
      data: { description: description },
      width: '300px',
    });
  }

  /**
   * Calls the addFavoriteMovie api service function and displays a success message with snackbar.
   * Then, ngOnInit is called to update the favoriteMovies array.
   * @param movieID
   * @param title
   */
  addFavoriteMovie(movieID: string, title: string): void {
    this.fetchApi.addFavoriteMovie(movieID).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites.`, 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
    // return this.getFavoriteMovies();
  }

  /**
   * Calls the deleteFavoriteMovie api service function and displays a success message with snackbar.
   * Then, ngOnInit is called to update the favoriteMovies array.
   * @param movieID
   * @param title
   */
  removeFavoriteMovie(movieID: string, title: string): void {
    this.fetchApi.deleteFavoriteMovie(movieID).subscribe((resp: any) => {
      this.snackBar.open(
        `${title} has been removed from your favorites.`,
        'OK',
        {
          duration: 2000,
        }
      );
      this.ngOnInit();
    });
    // return this.getFavoriteMovies();
  }

  /**
   * Checks if movieID in the favorites array matches the movieID from the param
   * @param movieID
   * @returns true or false
   */
  isFavorite(movieID: string): boolean {
    return this.favoriteMovies.some((movie) => movie === movieID);
  }

  /**
   * Calls isFavorite. If true, calls removeFavoriteMovie. If false, calls addFavoriteMovie.
   * @param movie
   */
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }
}
