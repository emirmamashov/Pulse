import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
	templateUrl: 'movie-info.html'
})

export class MovieInfo {

	movie: {};

	constructor(private navController: NavController, private navParams: NavParams) {
		this.movie = navParams.get('movie');
	}
}
