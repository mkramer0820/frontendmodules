import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { HttpClientService } from '../../_services/http-client.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private httpCS: HttpClientService ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
}
