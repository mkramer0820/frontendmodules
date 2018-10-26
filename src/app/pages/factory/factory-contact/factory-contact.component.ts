import { Component, AfterViewInit, ViewChild} from '@angular/core';
//import {MatDialog,/* MatTableDataSource*/} from '@angular/material';
import {Factory} from '../../../modules/models/factory.model';
import {Contact} from '../../../modules/models/contact.model';
import {ApiService} from '../../../config/api.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, FormArray} from '@angular/forms';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-factory-contact',
  templateUrl: './factory-contact.component.html',
  styleUrls: ['./factory-contact.component.scss']
})
export class FactoryContactComponent implements AfterViewInit {
  displayedColumns = ['id','first_name', 'contact_last_name',
                      'contact_phone_number', 'contact_email'];
  contacts: Contact[];
  dataSource = this.contacts;
  contactForm = this.fb.group({
    first_name: [''],
    contact_last_name: [''],
    contact_phone_number: [''],
    contact_email: [''],
  });

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
  ) {
      this.getfactories();
      this.contactForm = this.fb.group({
        'first_name': new FormControl('',),
        'contact_last_name': new FormControl('',),
        'contact_phone_number': new FormControl('',),
        'contact_email': new FormControl('',)
      });
    }

  ngAfterViewInit() {

  }

  getfactories() {
    this.apiService.getFactoryContacts().subscribe((contact: Array<Contact>) => {
      this.contacts = contact;
    });
  }
  addContact(form) {
    const newform = form.value;
    return this.apiService.createFactoryContact(newform).subscribe(rsp => {
      console.log(rsp)
      this.getfactories();

    });
  }
}
