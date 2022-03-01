import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

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

  constructor(
    public fetchMovies: UserRegistrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
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
}
