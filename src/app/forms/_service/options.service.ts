import { Injectable } from '@angular/core';
import {Observable, of, BehaviorSubject, Subject /* throwError as observableThrowError*/} from 'rxjs';
import {HttpClient, /*HttpHeaders*/} from '@angular/common/http';
import { AppConfig } from '../../config/app.config';
import { LoggerService } from '../../core/services/logger.service';
import {catchError, tap} from 'rxjs/operators';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
 
import { FormDropdown } from '../_models/form-dropdown';
import { FormBase }     from '../_models/form-base';
import { FormTextbox, FormCheckBox }  from '../_models/form-textbox';
import { NewFactory } from '../_models/factory-models/factory-model';
import { Factory } from 'src/app/modules/models/factory.model';
import { DropdownQuestion } from 'src/app/pages/task/_models/forms/form-dropdown';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  customerEndPoint: string;
  BASE_URL: string;
  apiUrl: string;
  test: any[] = [];
  dropdownOption: any;


  newForm: FormBase<any>[] = [];


  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.apiUrl = AppConfig.endpoints['url'], this.optionsRequest(), console.log(this.newForm); }

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
    const options = [];
    this.BASE_URL = AppConfig.urlOptions['factory'];
    return this.http.options(this.apiUrl + this.BASE_URL)
      .pipe(
        tap(() => LoggerService.log(`fetched options`)),
        catchError(OptionsService.handleError('getOptions', [])))
        .subscribe(response  => {
          response = response['actions']['POST'];
          for (const item in response) {
            if (response[item]['read_only'] === false && response[item]['type'] === 'option'  ) {
              let optionJson = response[item]['choices'];
              response[item] = response[item];
              let form = new FormDropdown({
                key: item,
                label: response[item]['label'],
                controlType: 'dropdown',
                required: response[item]['required'],
                text: 'text',
                options: optionJson,
              });
              this.newForm.push(form);
            } else if (response[item]['read_only'] === false && response[item]['type'] === 'boolean') {
              let optionJson = response[item];
              let form = new FormCheckBox({
                value: true,
                key: item,
                controlType: 'checkbox',
                required: optionJson['required'],
                label: optionJson['label'],
              });
              console.log('checkbox item', item, optionJson)
              this.newForm.push(form);
            } else if (response[item]['read_only'] === false && response[item]['type'] !== 'option') {
              let optionJson = response[item];
              response[item] = response[item];
                let form = new FormTextbox({
                key: item,
                label: optionJson['label'],
                controlType: 'textbox',
                required: false,
                text: 'text',
              });
              this.newForm.push(form);
            }
          }
        return this.newForm;
      });
    }
  returnOptions() {
    return this.optionsRequest();
  }
}
/*
 options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],

getTaskGroups() {
  const options = [];
  this.api.getTasks().subscribe((taskSet: TaskSet) => {
    const keys = Object.keys(taskSet[0]);
    const value = Object.values(taskSet);
    for (const set in taskSet) {
      let optiond = {}
      optiond['key'] = taskSet[set].id;
      optiond['value'] = taskSet[set].set_name;
      options.push(optiond);
    }
  });
  this.dropdownOption = options;
  return this.dropdownOption;
}
getForms2() {
  let tasks: FormBase<any>[] = [

    new FormDropdown({
      key: 'set_name',
      label: 'Task Set name',
      options: this.dropdownOption,
      order: 4
    })
  ];

  return tasks;
}*/



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
