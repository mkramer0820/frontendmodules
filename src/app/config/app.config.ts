import {InjectionToken} from '@angular/core';
import {IAppConfig, IAppUrlBody} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');


export const UrlBody: IAppUrlBody = {
  params: {
    id: 'id'
  }
};

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
    url: 'http://127.0.0.1:8000/api/',
    // url: 'http://104.248.10.237/api/',
  },
  base: 'http://127.0.0.1:8000/api/',
  //base: 'http://104.248.10.237/api/',
  urlOptions: {
    customer: 'customer/',
    factory: 'factory/',
    orders: 'orders/',
    ordersSort: `/orders/?ordering=${UrlBody.params.id}`,
    task: `task/`,
    taskGroup: `task/group/`,
    orderTasks: `orders/tasks/`,
    orderExpense: `order-expense/`,
    auth: `api-token-auth/`,
    factoryContact: `factory/contacts/`,
    sweaterSizes: `sweater-sizes/`,
  },
};





