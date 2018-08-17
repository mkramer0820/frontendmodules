import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig = {
  routes: {
    factory: 'factory',
    customer: 'customer',
    orders: 'orders',
    tasks: 'tasks',
    error404: '404',
  },
  endpoints: {
    url: 'http://127.0.0.1:8000/'
  },
}
