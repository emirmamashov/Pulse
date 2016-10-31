import {Http, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class AuthentificateService {
  data: any;

  constructor(private http: Http){}

  login(username: string, email: string, password: string): Observable<any> {
    var url = "http://pulse.kg/rest-auth/login/";
    var body =  { username: username, email: email, password: password };
    var response = this.http.post(url, body)
                      .map(res => res.json())
                      .catch(this.handleError);
    return response;
  }

  registr(username: string, email: string, password1: string, password2: string): Observable<any> {
    var url = "http://pulse.kg/rest-auth/registration/";
    var body = {username: username, email: email, password1: password1, password2: password2};
    var response = this.http.post(url, body)
                        .map(res => res.json())
                        .catch(this.handleError);
    return response;
  }

  changePass(newPass: string, confirmPass: string, token: string): Observable<any> {
    var url = "http://pulse.kg/rest-auth/password/change/";

    var headers = new Headers({
      "authorization": "JWT "+token
    });

    var body = {
      "new_password1": newPass,
      "new_password2": confirmPass
    };

    console.log("Headers: "+headers);

    var response = this.http.post(url, body, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);

    return response;
  }

  getCurrentUser(): Observable<any> {
    var url = "http://pulse.kg/rest-auth/user/?format=json";
    var response = this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);

    return response;
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
