import { Component, AfterViewInit, ViewChild} from '@angular/core';
//import {MatDialog,/* MatTableDataSource*/} from '@angular/material';
import {Factory} from '../../../modules/models/factory.model';
import {Contact} from '../../../modules/models/contact.model';
import {ApiService} from '../../../config/api.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, FormArray} from '@angular/forms';



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
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
  ) {
      this.getfactories();
      //this.form = this.fb.group({
        //contact: this.createFormArray()
      //});
   }

  ngAfterViewInit() {

  }

  getfactories() {
    this.apiService.getFactoryContacts().subscribe((contact: Array<Contact>) => {
      this.contacts = contact;
      console.log(this.contacts)
    });
  }

/*
  createFormArray(): FormArray {
    return new FormArray(this.dataSource).map(item => new FormGroup({
      active: new FormControl(this.contacts[]),
      active: new FormControl(this.contacts[]),
      active: new FormControl(this.contacts[]),
      active: new FormControl(this.contacts[]),
      active: new FormControl(this.contacts[]),
      active: new FormControl(item.active),
      anotherDropdown: new FormControl(item.anotherDropdown)})
    ));
  }*/
}

/*
export interface Contact {
  public id: number,
  public first_name: string,
  public last_name: string,
  public phone: string,
  public email: string,
  public slug: string

}*/


export class ContactDataBase {

  constructor(private http: ApiService) {}

  getContactInfo() {
    return this.http.getFactoryContacts();
  }
}
