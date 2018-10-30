
import { Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {ApiService} from '../../../config/api.service';
import {HttpClientService} from '../../../_services/http-client.service'
import {Factory} from '../../../modules/models/factory.model';
//import {FactoryService} from '../../customer.service';
import {FactorySharedService} from '../factory-shared.service';
import { Subscription } from 'rxjs';
import {AppConfig} from '../../../config/app.config';

@Component({
  selector: 'app-factory-update',
  templateUrl: './factory-update.component.html',
  styleUrls: ['./factory-update.component.scss']
})
export class FactoryUpdateComponent implements OnInit {

  factories: Factory[];
  factoryForm = this.fb.group({
    name: ['', Validators.required],
    address1: [''],
    address2: [''],
    address3: [''],
    country: [''],
    state: [''],
    zip: [''],
    email: [''],
    phone: [''],
    website: [''],
    description: [''],
  }); //turn semicolon to commma to add nested json
  //tasks: this.fb.array([
  //  this.fb.control('')aa
  //])
  //});

  factory: Factory[];
  subscription: Subscription;
  name: string;
  phone: string;



  constructor(
    private fb: FormBuilder,
    private  apiService: HttpClientService,
    private service: FactorySharedService,
  ) {
    //this.subscription = this.service.getMessage().subscribe(message => { this.message = message; });
    this.factoryForm = this.fb.group({
      'name': new FormControl(''),
      'address1': new FormControl(''),
      'address2': new FormControl(''),
      'address3': new FormControl(''),
      'country': new FormControl(''),
      'state': new FormControl(''),
      'zip': new FormControl(''),
      'email': new FormControl(''),
      'phone': new FormControl(''),
      'website': new FormControl(''),
      'description': new FormControl(''),
    });
  }

  ngOnInit() {
        this.factoryMessage();
    }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  factoryMessage(){
    this.subscription = this.service.getMessage().subscribe(message => {
       this.factory = message;
      });
    }

  updateFactory() {
    const factory = this.factoryForm.value;
    const id = this.factory['id'];
    console.log(id);
    this.apiService.put( `${AppConfig.urlOptions.factory}${id}/`, factory).subscribe(response => {
      console.log(response);
      this.factoryForm.reset();
    });
  }
}



/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
