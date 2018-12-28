import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse, HttpSentEvent
} from '@angular/common/http'

import { Observable, pipe} from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';
@Injectable()
export class HttpClientInterceptorService implements HttpInterceptor {

  actionButtonLabel: string = 'Login';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message: string


  constructor(private router: Router, public snackbar: MatSnackBar) { }
  // intercept request to add information to the headers such as the token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
    ): Observable<HttpEvent<any>> {

    //I decided to remove this logic from the interceptor to add the host url on the HttpClientService I created
    //const httpRequest = new HttpRequest(<any>request.method, environment.host + request.url, request.body);
    //request = Object.assign(request, httpRequest);

    // const token = JSON.parse(localStorage.getItem('currentUser'));
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        request = request.clone({
            setHeaders: {
                Authorization: `${'Bearer ' + currentUser}`
            }
        });
    }
    if (!currentUser) {
        this.router.navigate(['/login']);

    }
    if ((request.method === 'POST') || (request.method === 'PUT') ) {
      return next.handle(request).pipe(
        tap(event => {
          if (event instanceof HttpResponse && event.status === 200) {
            this.snackbar.open('Success')
            console.log(request.method)

            console.log('Interceptor - HttpResponse = ' + event.status); // http response status code
          }
          if (event instanceof HttpErrorResponse) {
            console.log(event.status)
          }
      }))
    } else {
      return next.handle(request)
    }
  }
    

  open(message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackbar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }
}


/*
    const token = localStorage.getItem('currentUser');
    console.log('injection toekn', token);

    if (token) {
      request = request.clone({
          setHeaders: {
              Authorization: `${'Bearer ' + token}`
          }
        })
      return next.handle(request)
        .pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              console.log('Interceptor - HttpResponse = ' + event.status); // http response status code
            }
            if (event instanceof HttpErrorResponse) {
              console.log(event.status)
            }
      }))
    };
  }
}*/
/*

return next.handle(request).pipe(catchError(err => {
  if (err.status === 401) {
      // auto logout if 401 response returned from api
      this.authenticationService.logout();
      location.reload(false);
  }
  if (err.status === 400) {
      // auto logout if 401 response returned from api
      this.authenticationService.logout();
      location.reload(false);
      this.httpCS.openSnackBar('Error Try again')
  }
  if (err.status === 404) {
          // auto logout if 401 response returned from api
          this.httpCS.openSnackBar('Not Found')

  }

  const error = err.error.message || err.statusText;
  return throwError(error);
})
)
}
}*/