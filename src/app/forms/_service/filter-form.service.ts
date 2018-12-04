import { Injectable }       from '@angular/core';
import { FormDropdown } from '../_models/form-dropdown';
import { FormBase }     from '../_models/form-base';
import { FormTextbox, FormCheckBox}  from '../_models/form-textbox';
import { FormDatePicker } from '../_models/form-date-picker';
import {HttpClientService} from '../../_services/http-client.service'
import {AppConfig} from '../../config/app.config';
import {map} from 'rxjs/operators'
import {pipe} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FilterFormService {
  constructor(private http: HttpClientService) {}
  getForms(buyers) {
    let date = new Date()
    let buyerOpt = {}

    let customerNames = []

    this.http.formOptions(`${AppConfig.urlOptions.orders}`)
      .subscribe((response: Options)  => { 
      let customers = response.actions.POST;
      let choices = customers.buyer.choices;
      customerNames.push('')
      for (let choice of choices) {
        customerNames.push(choice['value'])
      }

    })
    console.log(customerNames)

    let filter: FormBase<any>[] = [
      new FormCheckBox({
        key: 'isActive',
        value: true,
        label: 'Active/Inactive',
        controlType: 'checkbox',
        require: false,
        order: 0
      }),
      new FormDropdown({
        key: 'buyers',
        label: 'Buyer',
        controlType: 'dropdown',
        required: false,
        text: 'text',
        options: customerNames,
        order: 1,
      }),
      new FormTextbox({
        key: 'buyer_style_number',
        label: 'Buyer Style Number',
        value: '',
        controlType: 'textbox',
        type: 'text',
        required: false,
        order: 2
      }),
      new FormTextbox({
        key: 'jp_style_number',
        label: 'JP Style Number',
        value: '',
        controlType: 'textbox',
        type: 'text',
        required: false,
        order: 3
      }),
      new FormDatePicker({
        key: 'start_date',
        value: '',
        label: 'Date Range Start',
        controlType: 'datepicker',
        required: false,
        order: 4,
      }),
      new FormDatePicker({
        key: 'end_date',
        value: '',
        label: 'Date Range End',
        controlType: 'datepicker',
        required: false,
        order: 5,
      }),
      
    ];
    return filter.sort((a, b) => a.order - b.order);
  }
}


interface Options {
  name: string;
  description: string;
  renders: string[];
  parses: string[];
  actions: Actions;
}

interface Actions {
  POST: POST;
}

interface POST {
  id: Id;
  buyer: Buyer;
  factory: Buyer;
  buyer_name: Id;
  factory_name: Id;
  tasks: Id;
  due_date: Duedate;
  factory_ship_date: Duedate;
  sweater_image: Duedate;
  factory_set: Id;
  customer_set: Id;
  orderExpense: Id;
  isActive: Id;
  customer_order_number: Customerordernumber;
  buyer_style_number: Customerordernumber;
  jp_style_number: Customerordernumber;
  cost_from_factory: Costfromfactory;
  buyers_price: Costfromfactory;
  order_type: Ordertype;
  qty: Costfromfactory;
  sweater_description: Customerordernumber;
  brand: Ordertype;
  fiber_content: Customerordernumber;
  jp_care_instructions: Customerordernumber;
  color: Customerordernumber;
  jp_style_number_test: Jpstylenumbertest;
}

interface Jpstylenumbertest {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  child: Child2;
}

interface Child2 {
  type: string;
  required: boolean;
  read_only: boolean;
  children: Children2;
}

interface Children2 {
  id: Id;
  image: Customerordernumber;
  color: Customerordernumber;
  jp_style_number: Customerordernumber;
  sweater_description: Customerordernumber;
  features: Customerordernumber;
  fiber_content: Customerordernumber;
  jp_care_instructions: Customerordernumber;
  total_inventory: Costfromfactory;
  available_inventory: Costfromfactory;
  spec: Spec;
}

interface Spec {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  child: Child;
}

interface Child {
  type: string;
  required: boolean;
  read_only: boolean;
  children: Children;
}

interface Children {
  id: Id;
  spec: Customerordernumber;
  size: Customerordernumber;
}

interface Ordertype {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  choices: Choice2[];
}

interface Choice2 {
  value: string;
  display_name: string;
}

interface Costfromfactory {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  validators: string;
  formType: string;
}

interface Customerordernumber {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  max_length: number;
  formType: string;
}

interface Duedate {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  formType: string;
}

interface Buyer {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  choices: Choice[];
}

interface Choice {
  key: number;
  value: string;
}

interface Id {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
}