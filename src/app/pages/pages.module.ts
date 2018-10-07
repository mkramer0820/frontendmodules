import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ApiService} from '../config/api.service';
import { SharedModule } from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomerAddFormComponent} from './customer/customer-add/customer-add-form.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerTableComponent } from './customer/customer-table/customer-table.component';
import { CustomerUpdateComponent } from './customer/customer-update/customer-update.component';
import { OrdersTableComponent } from './orders/orders-table/orders-table.component';
import { OrdersAddComponent } from './orders/orders-add/orders-add.component';
import { OrdersUpdateComponent } from './orders/orders-update/orders-update.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { FactoryComponent } from './factory/factory.component';
import { FactoryTableComponent } from './factory/factory-table/factory-table.component';
import { FactoryAddComponent } from './factory/factory-add/factory-add.component';
import { FactoryUpdateComponent } from './factory/factory-update/factory-update.component';
import { FactoryContactComponent } from './factory/factory-contact/factory-contact.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TaskSetComponent } from './task/create-task-set/task-set.component';
import { TodosComponent } from './task/create-task-set/todos/todos.component';
import {TaskFormService} from './task/_service/task-form-service.service';
import { TaskUpdateComponent } from './task/create-task-set/task-update/task-update.component';
import { TaskGroupService } from './task/_service/task-group.service';
import { TaskComponent } from './task/task.component';
import { AddTaskGroupComponent } from './task/add-task-group/add-task-group.component';
import { UpdateTaskSetComponent } from './task/update-task-set/update-task-set.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    CustomerAddFormComponent,
    CustomerComponent,
    CustomerTableComponent,
    CustomerUpdateComponent,
    OrdersTableComponent,
    OrdersAddComponent,
    OrdersUpdateComponent,
    LoginComponent,
    FactoryComponent,
    FactoryTableComponent,
    FactoryAddComponent,
    FactoryUpdateComponent,
    FactoryContactComponent,
    TaskSetComponent,
    //CreateOrderTaskComponent,
    TodosComponent,
    TaskUpdateComponent,
    TaskComponent,
    AddTaskGroupComponent,
    UpdateTaskSetComponent, // required
  ],
  entryComponents: [
    CustomerAddFormComponent,
    CustomerUpdateComponent,
    FactoryAddComponent,
    FactoryUpdateComponent,
  ],
  exports: [
    CustomerAddFormComponent,
    CustomerTableComponent,
    CustomerUpdateComponent,
    OrdersTableComponent,
    OrdersAddComponent,
    OrdersUpdateComponent,
    FactoryTableComponent,
    FactoryAddComponent,
    FactoryUpdateComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    TaskFormService,
    TaskGroupService,


  ],
})
export class PagesModule { }
