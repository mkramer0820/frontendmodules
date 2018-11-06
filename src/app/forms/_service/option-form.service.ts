import { Injectable } from '@angular/core';
import {Observable, of, BehaviorSubject, Subject /* throwError as observableThrowError*/} from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { LoggerService } from '../../core/services/logger.service';
import {catchError, tap} from 'rxjs/operators';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { map, filter} from 'rxjs/operators';

import { FormDropdown } from '../_models/form-dropdown';
import { FormImageField } from '../_models/form-image';
import { FormBase }     from '../_models/form-base';
import { FormTextbox, FormCheckBox }  from '../_models/form-textbox';
import { FormDatePicker }  from '../_models/form-date-picker';
import { ApiService } from '../../config/api.service';
import {HttpClientService} from '../../_services/http-client.service';
import { FormControlService } from './form-control.service';

@Injectable()
export class OptionsFormService {

  customerEndPoint: string;
  BASE_URL =  AppConfig.base
  apiUrl: string;
  test: any[] = [];
  dropdownOption: any;
  newForm: FormBase<any>[] = [];


  constructor(private http: HttpClientService, private fb: FormBuilder, private api: ApiService, private fcs: FormControlService, ) {
    this.apiUrl = AppConfig.endpoints['url'] }

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

  formRequest(url: string) {
    const newForm = []
    let headers = this.api.setHeaders();
    return this.http.options(`${url}`, {headers})
      .pipe(map(response  => {
          response = response['actions']['POST'];
          for (const item in response) {
            if (response[item]['read_only'] === false && (response[item]['type'] === 'option' ||
             response[item]['type'] === 'choice')) {
             //let optionJson = response[item]['choices'];
             let optionJson= [];
              let choices = response[item]['choices']
              for (let dict of  choices) {
                if (dict.hasOwnProperty('display_name')) {
                  console.log("dcik value", dict.value)
                  let choice = {}
                  choice['key'] = dict.value
                  choice['value'] = dict.display_name
                  optionJson.push(choice)
                } else { 
                  let choice = {}
                  choice['key'] = dict.key
                  choice['value'] = dict.value
                  optionJson.push(choice)
                }
              }
              console.log(optionJson);
              response[item] = response[item];
              let form = new FormDropdown({
                key: item,
                label: response[item]['label'],
                controlType: 'dropdown',
                required: response[item]['required'],
                text: 'text',
                options: optionJson,
              });
              newForm.push(form);
            } else if (response[item]['read_only'] === false && response[item]['type'] === 'boolean') {
              let optionJson = response[item];
              let form = new FormCheckBox({
                value: true,
                key: item,
                controlType: 'checkbox',
                required: optionJson['required'],
                label: optionJson['label'],
              });
              newForm.push(form);
            } else if (response[item]['read_only'] === false && response[item]['type'] === 'datetime') {
              let optionJson = response[item];
              response[item] = response[item];
                let form = new FormDatePicker({
                key: item,
                value: new Date(),
                label: optionJson['label'],
                controlType: 'datepicker',
                required: false,
              });
              newForm.push(form);
            } else if (response[item]['type'] === 'image upload') {
              let optionJson = response[item];
              response[item] = response[item];
                let form = new FormBase ({
                key: item,
                value: null,
                label: optionJson['label'],
                controlType: 'image_upload',
                required: false,
              });
              newForm.push(form);
            } else if (response[item]['read_only'] === false && response[item]['type'] !== 'option') {
              let optionJson = response[item];
              response[item] = response[item];
                let form = new FormTextbox({
                key: item,
                value: '',
                label: optionJson['label'],
                controlType: 'textbox',
                required: false,
                text: 'text',
                max_length: optionJson['max_length'],
              });
              newForm.push(form);
            }
          }
          this.newForm = newForm;
        return newForm;
      })
    )}


}
