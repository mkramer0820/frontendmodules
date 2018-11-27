import { Component, AfterViewInit, ViewChild} from '@angular/core';
//import {MatDialog,/* MatTableDataSource*/} from '@angular/material';
import {Contact} from '../../../modules/models/contact.model';
import {HttpClientService} from '../../../_services/http-client.service';
import {AppConfig} from '../../../config/app.config';
import {FormBuilder, FormControl, FormGroup, FormArray} from '@angular/forms';
import {DynamicFormRequestComponent} from '../../../forms/dynamic-form/dynamic-form-request/dynamic-form-request.component';
import {DeleteModalComponent} from "../../../_helpers/delete-modal/delete-modal.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-factory-contact',
  templateUrl: './factory-contact.component.html',
  styleUrls: ['./factory-contact.component.scss']
})
export class FactoryContactComponent implements AfterViewInit {
  displayedColumns = ['id','first_name', 'contact_last_name',
                      'contact_phone_number', 'contact_email', 'update', 'delete'];
  contacts: Contact[];
  dataSource = this.contacts;
  contactForm = this.fb.group({
    first_name: [''],
    contact_last_name: [''],
    contact_phone_number: [''],
    contact_email: [''],
  });

  constructor(
    private http: HttpClientService,
    private fb: FormBuilder,
    private dialog: MatDialog,
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
  onRowClick(row) {
    console.log(row)
  }

  getfactories() {
    this.http.get(AppConfig.urlOptions.factoryContact).subscribe((response: Contact[]) => {
      this.contacts = response;
    });
  }
  addContact(form) {
    const newform = form.value;
    return this.http.post(AppConfig.urlOptions.factoryContact, newform).subscribe(rsp => {
      console.log(rsp);
      this.getfactories();

    });
  }
  openUpdateDialog(contact): void {
    const dialogRef = this.dialog.open(DynamicFormRequestComponent, {

      data: {formData: contact, url: AppConfig.urlOptions.factoryContact, update: true}
    });
    dialogRef.afterClosed().subscribe((contact: Contact[]) => {
      console.log(contact)
      this.getfactories();
      
    })
  }
  openDeleteDialog(factory) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {url: AppConfig.urlOptions.factoryContact, id: factory.id }
    });
    dialogRef.afterClosed().subscribe((contact: Contact[]) => {
      console.log(contact)
      this.getfactories();
      
    })
  }
}
