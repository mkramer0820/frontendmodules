import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private httpOptions: any;
  public token: string;
  public token_expires: Date;
  public username: string;
  public errors: any = [];
  public loggedin: boolean;






    constructor(private http: HttpClient) {
      this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
   }

    login(username: string, password: string) {
        return this.http.post<any>(`http://127.0.0.1:8000/api-token-auth/`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.token));
                }
                console.log(user.token)
                console.log(user)
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    updateData(token) {
      this.token = localStorage.getItem('currentUser');
      this.errors = [];

      const token_parts = this.token.split(/\./);
      const token_decoded = JSON.parse(window.atob(token_parts[1]));
      console.log(token_decoded);
      this.token_expires = new Date(token_decoded.exp * 1000);
      this.username = token_decoded.username;
  }
  isLoggedIn() {
    const loggedin: boolean = false;
    if (this.username) {
        loggedin = true;
    } else {
        this.loggedin = false;
    }
  }
}
