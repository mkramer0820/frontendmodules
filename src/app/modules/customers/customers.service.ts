import { Injectable } from '@angular/core';
import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AppConfig } from '../../config/app.config';
import { Customer } from '../models/customer.model';
//import material here
import { LoggerService } from '../../core/services/logger.service';
import {catchError, tap} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CustomersService {
  customerEndPoint: string;
  customerUrl: string;
  customerApi: string;

  constructor(
    private http: HttpClient) { this.customerEndPoint = AppConfig.endpoints['url'],
    this.customerUrl = AppConfig.routes['customer'],
    this.customerApi = AppConfig.endpoints['url'] + AppConfig.routes['customer']}

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
    return this.http.get<Customer[]>(this.customerApi)
      .pipe(
        tap(() => LoggerService.log(`fetched customers`)),
        catchError(CustomersService.handleError('getCustomers', []))
      );
}
  getCustomersById(id: string): Observable<Customer> {
    const url = `${this.customerApi}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(() => LoggerService.log(`fetched customer id=${id}`)),
      catchError(CustomersService.handleError<Customer>(`getCustomer id=${id}`))
    );
  }
  createCustomer(customer: Customer): Observable<Customer> {
  return this.http.post<Customer>(this.customerApi, JSON.stringify({
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
      this.showSnackBar('heroCreated');
    }),
    catchError(CustomerService.handleError<Customer>('addCustomer'))
  );
}
  deleteCustomerById(id: any): Observable<Array<Customer>> {
    const url = `${this.customerApi}/${id}`;

    return this.http.delete<Array<Customer>>(url, httpOptions).pipe(
      tap(() => LoggerService.log(`deleted hero id=${id}`)),
      catchError(CustomersService.handleError<Array<Customer>>('deleteHero'))
    );
  }
}
