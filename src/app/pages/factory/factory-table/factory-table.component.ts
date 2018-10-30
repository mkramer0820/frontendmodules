import { Component, OnInit} from '@angular/core';
import {MatDialog,/* MatTableDataSource*/} from '@angular/material';
import {Factory} from '../../../modules/models/factory.model';
import {ApiService} from '../../../config/api.service';
import {FactoryBaseComponent} from '../../../forms/factory/factory-base/factory-base.component';
import {FactoryUpdateComponent} from '../factory-update/factory-update.component';
import {FactorySharedService} from '../factory-shared.service';
import {Subscription} from 'rxjs';
import {ModalService} from '../../_services/modal.service';
import {DynamicFormRequestComponent} from '../../../forms/dynamic-form/dynamic-form-request/dynamic-form-request.component';
import { AppConfig } from 'frontendmodules-dev/src/app/config/app.config';


@Component({
  selector: 'app-factory-table',
  templateUrl: './factory-table.component.html',
  styleUrls: ['./factory-table.component.scss']
})
export class FactoryTableComponent implements OnInit {

  factories: Factory[];
  displayedColumns: string[] = [
    'ID', 'NAME', 'ADDRESS1', 'ADDRESS2', 'ADDRESS3',
    'COUNTRY', 'STATE', 'ZIP', 'EMAIL', 'PHONE',
    'WEBSITE', 'DESCRIPTION', 'UPDATE',
  ];
  message: any;
  subscription: Subscription;
  recieve: any;
  selectedrow: any;
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private service: FactorySharedService,
    private modalService: ModalService,
  ) {
  }

  ngOnInit() {
    this.getfactories();
    this.subscription = this.service.getMessage().subscribe(message => this.recieve = message);
  }
  sendMessage(message): void {
        // send message to subscribers via observable subject
        this.service.sendMessage(message);
    }
  clearMessage(): void {
          // clear message
          this.service.clearMessage();
        }


  getfactories() {
    this.apiService.factories().subscribe((factories: Array<Factory>) => {
      this.factories = factories;
    });
  }
  /*
  openUpdateDialog(id): void {
    const dialogRef = this.dialog.open(FactoryUpdateComponent, {
      width: '700px',
    });
    this.apiService.getFactoryDetails(id).subscribe((response: any) => {
      this.message = response;
      this.sendMessage(this.message)
      this.subscription = this.service.getMessage().subscribe(message =>
         this.recieve = message);
    });
    dialogRef.afterOpen().subscribe(result => {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.apiService.factories().subscribe((factories: Array<Factory>) => {
        this.factories = factories;
        return dialogRef.close();
      });
    });
  }*/
  onRowClicked(row) {
    this.selectedrow = row;
    console.log(this.selectedrow);
  }
  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormRequestComponent, {
      width: '700px',
      data: {url: AppConfig.urlOptions.factory, update: false, formData: this.selectedrow }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.apiService.factories().subscribe((factories: Array<Factory>) => {
        this.factories = factories;
        result = this.factories;
        console.log(result)

      });
    });
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormRequestComponent, {
      width: '700px',
      data: {url: AppConfig.urlOptions.factory, update: false}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.apiService.factories().subscribe((factories: Array<Factory>) => {
        this.factories = factories;
        result = this.factories;
        console.log(result)

      });
    });
  }
  openModal(id: string, factory?) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
