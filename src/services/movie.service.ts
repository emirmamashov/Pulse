import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import { Injectable } from '@angular/core';

@Injectable()
export class MovieService {
  static get parameters() {
    return [[Http]];
  }

  constructor(private http:Http) {

  }

  searchMoviesObservable(movieName: string): Observable<any> {
    var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url)
                    .map(res => res.json())
                    .catch(this.handleError);
    return response;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
