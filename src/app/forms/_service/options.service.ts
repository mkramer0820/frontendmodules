import { Injectable } from '@angular/core';
import {Observable, of,/* throwError as observableThrowError*/} from 'rxjs';
import {HttpClient, /*HttpHeaders*/} from '@angular/common/http';
import { AppConfig } from '../../config/app.config';
import { LoggerService } from '../../core/services/logger.service';
import {catchError, tap} from 'rxjs/operators';

 
import { FormDropdown } from '../_models/form-dropdown';
import { FormBase }     from '../_models/form-base';
import { FormTextbox }  from '../_models/form-textbox';
import { NewFactory } from '../_models/factory-models/factory-model';
import { Factory } from 'src/app/modules/models/factory.model';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  customerEndPoint: string;
  BASE_URL: string;
  apiUrl: string;
  message = 'Customer Created';
  options: any;


  constructor(private http: HttpClient) {  this.apiUrl = AppConfig.endpoints['url'], this.optionsRequest() }

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

  optionsRequest() {
    // let factory: FormBase<any>[] = []


    this.BASE_URL = AppConfig.urlOptions['factory'];
    return this.http.options(this.apiUrl + this.BASE_URL)
      .pipe(
        tap(() => LoggerService.log(`fetched options`)),
        catchError(OptionsService.handleError('getOptions', [])))
        /*
      .subscribe(response => {
        this.options = response['actions']['POST'];
       // console.log(this.options);

        for (const item in this.options) {
          if (this.options[item].hasOwnProperty('type')) {
            console.log(this.options[item]);
            let optionJson = this.options[item];
            let textbox = new FormTextbox({
              key: item,
              label: optionJson['label'],
              type: 'text'
            });
            factory.push(textbox);
          } else { console.log(item, "oops") }

        }
        return factory;
      });*/
    }

  
    /*
  getOptions(): Observable<PostOptions> {
    this.BASE_URL = AppConfig.urlOptions['factory'];
    return this.http.get<PostOptions>(this.apiUrl + this.BASE_URL)
      .pipe(
        tap(() => LoggerService.log(`fetched customers`)),
        catchError(CustomersService.handleError('getCustomers', []))
      );
    }*/

}


export class RootOptions {
  actions: Actions;
}

export class Actions {
  POST: PostOptions;
}
export class PostOptions {
  id: Options;
  name: Options;
  address1: Options;
  address2: Options;
  address3: Options;
  country: Options;
  state: Options;
  zip: Options;
  email: Options;
  phone: Options;
  website: Options;
  description: Options;
  createdOn: Options;
  isActive: Options;
  contact_Options: Options;
}

export class Options {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  max_length?: number;
}
