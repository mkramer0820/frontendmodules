import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DynamicFormRequestComponent} from '../../../forms/dynamic-form/dynamic-form-request/dynamic-form-request.component';
import { AppConfig } from '../../../config/app.config';
import {DeleteModalComponent} from '../../../_helpers/delete-modal/delete-modal.component';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { HttpClientService } from '@app/_services/http-client.service';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators'


@Component({
  selector: 'app-factory-table',
  templateUrl: './factory-table.component.html',
  styleUrls: ['./factory-table.component.scss']
})
export class FactoryTableComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource = new  MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedrow: any;
  constructor(
    private http: HttpClientService,
    private dialog: MatDialog,
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
    this.http.get(AppConfig.urlOptions.factory)
    .pipe(map((factories: Factory[]) => {
      let dataItems = factories;
      let cols = Array.from(Object.keys(factories[0]))
      return {dataItems, cols}
    }))
    .subscribe(response => {
      this.dataSource = new MatTableDataSource(response.dataItems);
      this.dataSource.sort = this.sorted();
      response.cols.forEach(col => {
        if ((col != 'isActive') && (col != 'contact_name')) {
          this.displayedColumns.push(col)
        }
      });
      this.displayedColumns.push('update')
      this.displayedColumns.push('delete')
      console.log(this.dataSource.data)
      console.log(this.displayedColumns)

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
      this.getfactories();
    });
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormRequestComponent, {
      width: '700px',
      data: {url: AppConfig.urlOptions.factory, update: false}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getfactories();
    });
  }
  openDeleteDialog(factory): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {url: AppConfig.urlOptions.factory, id: factory.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getfactories();
    });
   }
}

interface Factory {
  id: number;
  contact: string;
  contact_name: number;
  isActive: boolean;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  description: string;
}