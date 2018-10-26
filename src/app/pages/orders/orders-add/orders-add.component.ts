import { Component, OnInit } from '@angular/core';
import {Order} from '../../../modules/models/orders.model';
import {FormBuilder, FormControl} from '@angular/forms';
import {ApiService} from '../../../config/api.service';
import {HttpClientService} from '../../../_services/http-client.service';
import {Customer} from '../../../modules/models/customer.model';
import {Factory} from '../../../modules/models/factory.model';
import { Observable } from 'rxjs';
import {VERSION} from '@angular/material';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {AppConfig} from '../../../config/app.config';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const DD_MM_YYYY_Format = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'MM/DD/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
  ]
})
export class OrdersAddComponent implements OnInit {
  version = VERSION
  order: Order[];
  customers: Customer[];
  factories: Factory[];
  brands= ['888', 'JP', 'AVE', 'OTHER'];
  //types = ["Delivary Duty Paid", "Freight On Board"];
  types = ['DDP', 'FOB', 'NA'];
  orderForm = this.fb.group({
    buyer: [''],
    factory: [''],
    customer_order_number: [''],
    buyer_style_number: [''],
    jp_style_number: [''],
    factory_ship_date: [''],
    cost_from_factory: [''],
    buyers_price: [''],
    qty: [''],
    order_type: [''],
    brand: [''],
    fiber_content: [''],
    jp_care_instructions: [''],
    color: [''],
    sweater_image: [null],
    due_date: ['']
  });
  //turn semicolon to commma to add nested json
  //tasks: this.fb.array([
  //  this.fb.control('')
  //])
  //});
  testdate: string;
  constructor(
    private fb: FormBuilder,
    private  apiService: ApiService,
    private http: HttpClientService,
  ) {
    this.orderForm = this.fb.group({
      'buyer': new FormControl(''),
      'factory': new FormControl(''),
      'customer_order_number': new FormControl(''),
      'buyer_style_number': new FormControl(''),
      'jp_style_number': new FormControl(''),
      'factory_ship_date': new FormControl(moment().format('YYYY-MM-DD')),
      'cost_from_factory': new FormControl(''),
      'buyers_price': new FormControl(''),
      'qty': new FormControl(''),
      'order_type': new FormControl(''),
      'brand': new FormControl(''),
      'fiber_content': new FormControl(''),
      'jp_care_instructions': new FormControl(''),
      'color': new FormControl(''),
      'sweater_image': [null],
      'due_date': new FormControl(moment().format('YYYY-MM-DD'))
    });
  }

  ngOnInit() {
    this.getFactoryCustomer();
    }

  onFileChanged(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
        reader.onload = () => {
          this.orderForm.patchValue({
            sweater_image: reader.result
          });
        };
      }
    }
    uploadImage(event: any) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          this.orderForm.get('sweater_image').setValue(event.target.files[0]);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  getFactoryCustomer(){
    this.apiService.getCustomers().subscribe((customers: Array<Customer>) => {

      this.customers = customers
      console.log(this.customers);
    });
    this.apiService.factories().subscribe((factories: Array<Factory>) => {

      this.factories = factories
      console.log(this.factories);
    });
  }/*
  createOrder() {
    this.orderForm.controls['factory_ship_date'].setValue(this.orderForm.controls['factory_ship_date'].value.format('YYYY-MM-DD'));
    const order = this.orderForm.value;
    console.log(order)
    this.apiService.createOrder(order).subscribe((response) => {
      console.log(response);
      this.orderForm.reset();
    });
  }*/
  onSubmit(): void {
    const uploadData = new FormData();
    if (this.orderForm.get('sweater_image').value != null) {
      let due_date = this.orderForm.get('due_date').value;
      due_date = moment(due_date).format('YYYY-MM-DD hh:mm');

      let factoryShipDate = this.orderForm.get('factory_ship_date').value;
      factoryShipDate = moment(factoryShipDate).format('YYYY-MM-DD hh:mm');

      console.log('date was formatted too : ', this.orderForm.value );
      uploadData.append('buyer', this.orderForm.get('buyer').value);
      uploadData.append('factory', this.orderForm.get('factory').value);
      uploadData.append('customer_order_number', this.orderForm.get('customer_order_number').value);
      uploadData.append('buyer_style_number', this.orderForm.get('buyer_style_number').value);
      uploadData.append('jp_style_number', this.orderForm.get('jp_style_number').value);
      uploadData.append('due_date', due_date);
      uploadData.append('factory_ship_date', factoryShipDate);
      uploadData.append('cost_from_factory', this.orderForm.get('cost_from_factory').value);
      uploadData.append('buyers_price', this.orderForm.get('buyers_price').value);
      uploadData.append('order_type', this.orderForm.get('order_type').value);
      uploadData.append('fiber_content', this.orderForm.get('fiber_content').value);
      uploadData.append('jp_care_instructions', this.orderForm.get('jp_care_instructions').value);
      uploadData.append('color', this.orderForm.get('color').value);
      uploadData.append('sweater_image', this.orderForm.get('sweater_image').value);
      /*this.apiService.createOrder(uploadData).subscribe(response => {
        console.log(response);
        this.orderForm.reset();*/
      this.http.post(AppConfig.urlOptions.orders, uploadData).subscribe(response => {
        console.log(response);
        this.orderForm.reset();
      });
    } else {
      let due_date = this.orderForm.get('due_date').value;
      due_date = moment(due_date).format('YYYY-MM-DD hh:mm');

      let factoryShipDate = this.orderForm.get('factory_ship_date').value;
      factoryShipDate = moment(factoryShipDate).format('YYYY-MM-DD hh:mm');

      uploadData.append('buyer', this.orderForm.get('buyer').value);
      uploadData.append('factory', this.orderForm.get('factory').value);
      uploadData.append('customer_order_number', this.orderForm.get('customer_order_number').value);
      uploadData.append('buyer_style_number', this.orderForm.get('buyer_style_number').value);
      uploadData.append('jp_style_number', this.orderForm.get('jp_style_number').value);
      uploadData.append('due_date', due_date);
      uploadData.append('factory_ship_date', factoryShipDate);
      uploadData.append('cost_from_factory', this.orderForm.get('cost_from_factory').value);
      uploadData.append('buyers_price', this.orderForm.get('buyers_price').value);
      uploadData.append('order_type', this.orderForm.get('order_type').value);
      uploadData.append('fiber_content', this.orderForm.get('fiber_content').value);
      uploadData.append('jp_care_instructions', this.orderForm.get('jp_care_instructions').value);
      uploadData.append('color', this.orderForm.get('color').value);
      this.apiService.createOrder(uploadData).subscribe(response => {
        console.log(response);
        this.orderForm.reset();

      });
    }
  }
}
