import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppConfig } from '../config/app.config';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {  MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material';
import {map} from 'rxjs/operators';

@Injectable({ providedIn:'root' })
export class HttpClientService {
  BASE_URL = AppConfig.base;
  //BASE_URL = 'http://104.248.10.237/'
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private http: HttpClient, public snackBar: MatSnackBar,
    ) { }

  get(url: string, options?: any): Observable<ArrayBuffer> {
    return this.http.get(`${this.BASE_URL}${url}`, options);
  }

  post(url: string, body: any, options?: any): Observable<ArrayBuffer> {
    return this.http.post(`${this.BASE_URL}${url}`, body, options);
  }

  put(url: string, body: any, options?: any) {
    return this.http.put(`${this.BASE_URL}${url}`, body, options)
    .pipe(catchError(err => {
      if (err.status === 400) {
        this.openSnackBar(err);

        
          // auto logout if 401 response returned from api
          location.reload(false);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  };
  
  login(username: string, password: string) {

    return this.http.post<any>(`${AppConfig.base + 'api-token-auth/'}`, { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.token));
            }
            return user;
        }),
        catchError(err => {
          if (err.status === 400) {
            this.openSnackBar(err);
    
            
              // auto logout if 401 response returned from api
              location.reload(false);
          }
    
          const error = err.error.message || err.statusText;
          return throwError(error);
        })
        );
  }

  delete(url: string) {
    return this.http.delete(`${this.BASE_URL + url}/`);
  }

  options(url, options?: any): Observable<ArrayBuffer> {
    return this.http.options(`${this.BASE_URL}${url}`, options);
  }
  formOptions(url, options?: any): Observable<any> {
    return this.http.options(`${this.BASE_URL}${url}`, options);
  }

  private updateUrl(req: string) {
    return environment.apiUrl + req;
  }
  openSnackBar(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }
}

