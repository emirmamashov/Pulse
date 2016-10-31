import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {MovieService} from "../../services/movie.service";
import {MovieInfo} from "../movie-info/movie-info";
import {Http, Response} from '@angular/http';
import "rxjs";

@Component({
  templateUrl: 'movie-list.html',
  providers: [MovieService]
})

export class MovieListPage {

  movies: Array<any>;

  constructor(public navController: NavController,
              public movieService: MovieService,
              public alertCtrl: AlertController) {

  }

  searchMovieDB(event: any): void {
    if(event.target.value.length > 2) {
      this.movieService.searchMoviesObservable(event.target.value).subscribe(
        data => {
          this.movies = data.results;
          console.log(data);
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: data,
            buttons: ['OK']
          });
          alert.present();
        },
        err => {
          console.log(err);
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: err,
            buttons: ['OK']
          });
          alert.present();
        },
        () => console.log('Movie Search Complete')
      );
    }
  }


  itemTapped(event: any, movie: string): void {
    console.log(movie);
    this.navController.push(MovieInfo, {
      movie: movie
    });
  }
}
