# MyFlixAngularClient

![myFlix-angular-screenshot](https://user-images.githubusercontent.com/89062671/157138013-3676b2d7-1aea-4841-9e21-2d2d6926303a.png)

This is a full-stack application that allows registered and authenticated users to login and view a collection of classic movies while keeping a list of their favorites. This is an Angular/Typescript front-end to the node.js [backend API](https://github.com/Djosc/Movie-API).

## Features

- Users are greeted by a welcome page that allows them to either register or login. Upon clicking either button, a form will appear for the user to complete.
- Once logged in, the main list of movies will be displayed. This will allow the user to view information about movie, genre, and director.
- Users can click the heart icon to add a movie to their favorites list; a message will display giving the user confirmation of this. Re-clicking it will remove the movie from their favorites.
- These favorite movies can be viewed by using the navbar at the top of their screen to navigate to the user's profile. The user's account information will also be displayed here along with options to edit or delete their profile.
- The user can log out with the button on the top right of the screen.

## Technologies

- Angular
- Angular Material UI
- Typescript
- Typedoc

## Installation

Clone the repository to a local directory with 
```
$ git clone https://github.com/Djosc/myFlix-Angular-client.git
```
From within the local project directory to install the necessary dependencies
```
npm install
```
This project requires the Angular CLI to run a development server
```
npm install -g @angular/cli
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

