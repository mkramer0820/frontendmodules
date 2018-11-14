import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private token = localStorage.getItem('currentUser');

    setHeaders() {
        let headers: HttpHeaders = new HttpHeaders();
        // headers = headers.append('content-type', 'application/json');
        let token = JSON.parse(this.token);
        headers = headers.set('Authorization', `Bearer ${token}`);
        //console.log(userDetails);
        console.log(headers);
        return headers;
      }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // let currentUser = localStorage.getItem('currentUser');
        // let headers = this.setHeaders();

        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${'Bearer ' + currentUser}`
                }
            });
            console.log(request.headers, 'console the fucking')
        }
        console.log('JWT PAGES INTERCEPTOR', currentUser);
        return next.handle(request);
    }
}


/*
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
*/