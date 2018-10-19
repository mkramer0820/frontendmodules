import {InjectionToken} from '@angular/core';
import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');


export const AppConfig: IAppConfig = {
  routes: {
    // factory: 'factory',
     customer: 'test-customer',
     customerApi: 'customer',
    // orders: 'orders',
    // tasks: 'tasks',
    error404: '404',
  },
  endpoints: {
    url: 'http://127.0.0.1:8000/',
  },
  urlOptions: {
    customer: 'customer/',
    factory: 'factory/'
  },
};




