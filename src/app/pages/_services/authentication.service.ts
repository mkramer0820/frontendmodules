import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


import { map } from 'rxjs/operators';
import {AppConfig} from '../../config/app.config';

export interface LoggedInUser {
  email: string;
  exp: number;
  user_id: number;
  username: string;
}




@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  private loggedInUser = new BehaviorSubject('Please Log In');
  currentUser = this.loggedInUser.asObservable();
  private httpOptions: any;
  public token: string;
  public token_expires: Date;
  public username: string;
  public errors: any = [];
  public loggedin: boolean;

    constructor(private http: HttpClient, private router: Router)
    {
      this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
   }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  changeUser(user: string) {
    this.loggedInUser.next(user);
  }


    login(username: string, password: string) {

        return this.http.post<any>(`${AppConfig.base + AppConfig.urlOptions.auth}`, { username, password })
            .pipe(map(user => {
                const token = user.token;
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(token));
                    user = this.updateData(token);
                    this.loggedInUser.next(user['user']);
                    this.loggedIn.next(true);
                    console.log(this.loggedInUser);
                }
                this.router.navigate(['/home']);

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
        this.loggedInUser.next(null);
    }
    updateData(token: any) {
        const token_parts = token.split(/\./);
        let token_decoded: Jwt;
        token_decoded = JSON.parse(window.atob(token_parts[1]));
        console.log(token_decoded);
        const data: {} = {
          user: token_decoded.username,
          expiration: new Date(token_decoded.exp * 1000),
          email:  token_decoded.email,
          id: token_decoded.user_id
          }
        return data;
      }

}
export interface Jwt {
  user_id: number;
  username: string;
  exp: number;
  email: string;

}
