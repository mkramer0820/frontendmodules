import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog,/* MatTableDataSource*/} from '@angular/material';
import {Factory} from '../../../modules/models/factory.model';
import {ApiService} from '../../../config/api.service';
import {FactorySharedService} from '../factory-shared.service';
import {Subscription} from 'rxjs';
import {ModalService} from '../../_services/modal.service';
import {DynamicFormRequestComponent} from '../../../forms/dynamic-form/dynamic-form-request/dynamic-form-request.component';
import { AppConfig } from '../../../config/app.config';
import {DeleteModalComponent} from '../../../_helpers/delete-modal/delete-modal.component';
import {MatSort, MatTableDataSource, MatTable, MatPaginator} from '@angular/material';


@Component({
  selector: 'app-factory-table',
  templateUrl: './factory-table.component.html',
  styleUrls: ['./factory-table.component.scss']
})
export class FactoryTableComponent implements OnInit {

  factories: Factory[];
  displayedColumns: string[] = [
    'id','contacts', 'name', 'address1', 'address2', 'address3',
    'country', 'state', 'zip', 'email', 'phone',
    'website', 'description', 'update', "delete"
  ];

  dataSource = new  MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedrow: any;
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private service: FactorySharedService,
  ) {
  }

  ngOnInit() {
    this.getfactories();
  }
  sorted() {
    return this.dataSource.sort = this.sort
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getfactories() {
    this.apiService.factories().subscribe((factories: Array<Factory>) => {
      console.log(factories)
      this.dataSource = new MatTableDataSource(factories);
      this.dataSource.sort = this.sorted();
    });
  }
  onRowClicked(row) {
    this.selectedrow = row;
    console.log(this.selectedrow);
  }
  openUpdateDialog(updateData): void {
    const dialogRef = this.dialog.open(DynamicFormRequestComponent, {
      width: '700px',
      data: {url: AppConfig.urlOptions.factory, update: true, formData: updateData }
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
  openDeleteDialog(factory): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {url: AppConfig.urlOptions.factory, id: factory.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.apiService.factories().subscribe((factories: Array<Factory>) => {
        this.factories = factories;
        result = this.factories;
        console.log(result)
      });
    });
   }
}
