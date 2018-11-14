import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class HttpClientInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  // intercept request to add information to the headers such as the token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //I decided to remove this logic from the interceptor to add the host url on the HttpClientService I created
    //const httpRequest = new HttpRequest(<any>request.method, environment.host + request.url, request.body);
    //request = Object.assign(request, httpRequest);

    // const token = JSON.parse(localStorage.getItem('currentUser'));
    const token = localStorage.getItem('currentUser');
    console.log('injection toekn', token);

    if (token) {
      const newReq = request.clone(
        {
          headers: request.headers.set('Authorization',
            `Bearer ${token}`)
        });

      return next.handle(newReq).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log('Interceptor - HttpResponse = ' + event.status); // http response status code
          }
        }, error => {
          // http response status code
          if (error instanceof HttpErrorResponse) {
            console.log('----response----');
            console.error('status code:');
            console.error(error.status);
            console.error(error.message);
            console.log('--- end of response---');

            if (error.status === 401 || error.status === 403) { //check if the token expired and redirect to login
              this.router.navigate(['login']); }
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
