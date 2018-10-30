import { Injectable } from '@angular/core';
import {Observable, of,/* throwError as observableThrowError*/} from 'rxjs';
import {HttpClient, /*HttpHeaders*/} from '@angular/common/http';
import { AppConfig } from '../../config/app.config';
import { Customer } from '../models/customer.model';
import { LoggerService } from '../../core/services/logger.service';
import {catchError, tap} from 'rxjs/operators';
//import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

/*const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};*/

@Injectable()
export class CustomersService {
  customerEndPoint: string;
  urlOption: string;
  apiUrl: string;
  message = 'Customer Created';
  customer: Customer[];

  constructor(
    private http: HttpClient,
    //private snackBar: MatSnackBar
  ) { this.apiUrl = AppConfig.endpoints['url']}

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }




  getCustomers(): Observable<Customer[]> {
    this.urlOption = AppConfig.urlOptions['customer']
    return this.http.get<Customer[]>(this.apiUrl+this.urlOption)
      .pipe(
        tap(() => LoggerService.log(`fetched customers`)),
        catchError(CustomersService.handleError('getCustomers', []))
      );
    }

  getCustomersById(id: string): Observable<Customer> {
    this.urlOption = AppConfig.urlOptions['customer']

    const url = `${this.apiUrl}/${this.urlOption}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(() => LoggerService.log(`fetched customer id=${id}`)),
      catchError(CustomersService.handleError<Customer>(`getCustomer id=${id}`))
    );
  }
  /*
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, JSON.stringify({
      name: customer.name,
      address1: customer.address1,
      address2: customer.address2,
      address3: customer.address3,
      country: customer.country,
      state: customer.state,
      zip: customer.zip,
      email: customer.email,
      phone: customer.phone,
      website: customer.website,
      description: customer.description,
    }), httpOptions).pipe(
      tap((customerSaved: Customer) => {
        LoggerService.log(`added customer w/ id=${customerSaved.id}`);
      }),
      catchError(CustomersService.handleError<Customer>('addCustomer'))
    );
  }
  deleteCustomerById(id: any): Observable<Array<Customer>> {
  const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Array<Customer>>(url, httpOptions).pipe(
      tap(() => LoggerService.log(`deleted hero id=${id}`)),
      catchError(CustomersService.handleError<Array<Customer>>('deleteHero'))
    );
  }
  */
}
