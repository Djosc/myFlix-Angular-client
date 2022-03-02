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

  getMovies(): void {
    this.fetchApi.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApi.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      console.log(this.favoriteMovies);
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name: name, description: description },
      width: '300px',
    });
  }

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

  openDescriptionDialog(description: string): void {
    this.dialog.open(DescriptionCardComponent, {
      data: { description: description },
      width: '300px',
    });
  }

  // ! may need to reupdate the favorite movies array to rehydrate the data
  addFavoriteMovie(movieID: string, title: string): void {
    this.fetchMovies.addFavoriteMovie(movieID).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites.`, 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
    // return this.getFavoriteMovies();
  }

  removeFavoriteMovie(movieID: string, title: string): void {
    this.fetchMovies.deleteFavoriteMovie(movieID).subscribe((resp: any) => {
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

  isFavorite(movieID: string): boolean {
    return this.favoriteMovies.some((movie) => movie === movieID);
  }

  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }
}
