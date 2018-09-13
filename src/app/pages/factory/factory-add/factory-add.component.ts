import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import {ApiService} from '../../../config/api.service';
import {Factory} from '../../../modules/models/factory.model';
//import {FactoryService} from '../../customer.service';
import {FactorySharedService} from '../factory-shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-factory-add',
  templateUrl: './factory-add.component.html',
  styleUrls: ['./factory-add.component.scss']
})
export class FactoryAddComponent implements OnInit {


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
    //  this.fb.control('')
    //])
    //});

    factory: Factory[];
    subscription: Subscription;

    constructor(
      private fb: FormBuilder,
      private  apiService: ApiService,
    ) {
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

      }

    createFactory() {
      const factory = this.factoryForm.value;
      this.apiService.createFactory(factory).subscribe((response) => {
        console.log(response);
        this.factoryForm.reset();
      });
    }
  }
