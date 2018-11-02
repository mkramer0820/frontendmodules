import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ApiService} from '../config/api.service';
import { SharedModule } from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomerTableComponent } from './customer/customer-table/customer-table.component';
import { OrdersTableComponent } from './orders/orders-table/orders-table.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { FactoryComponent } from './factory/factory.component';
import { FactoryTableComponent } from './factory/factory-table/factory-table.component';
import { FactoryContactComponent } from './factory/factory-contact/factory-contact.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TaskSetComponent } from './task/create-task-set/task-set.component';
import { TodosComponent } from './task/create-task-set/todos/todos.component';
import {TaskFormService} from './task/_service/task-form-service.service';
import { TaskUpdateComponent } from './task/create-task-set/task-update/task-update.component';
import { TaskGroupService } from './task/_service/task-group.service';
import { TaskComponent } from './task/task.component';
import { AddTaskGroupComponent } from './task/add-task-group/add-task-group.component';
import { TaskSetDropdownComponent } from './task/create-task-set/task-set-dropdown/task-set-dropdown.component';
import {ModalService} from './_services/modal.service';
import { ModalComponent } from './_directives/modal/modal.component';
import { OrderTaskComponent } from './orders/order-task/order-task.component';
import {OrderTaskFormService} from './orders/order-task/_service/order-task-form.service';
import { OrderTodosComponent } from './orders/order-task/order-todos/order-todos.component';
import { DatePickerComponent } from '../_util/date-picker/date-picker/date-picker.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { TimeDifferenceComponent } from './_directives/time-diff/time-difference/time-difference.component';
import { JpFormsModule } from '../forms/jp-forms.module';
import { DashboardComponent } from '../core/dashboard/dashboard.component';
import {PostService} from '../_services/post.service';
import { DynamicFormRequestComponent } from '../forms/dynamic-form/dynamic-form-request/dynamic-form-request.component';
import {OptionsFormService} from '../forms/_service'
import {CustomerComponent} from './customer/customer.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    JpFormsModule,
  ],
  declarations: [
    CustomerTableComponent,
    OrdersTableComponent,
    LoginComponent,
    FactoryComponent,
    FactoryTableComponent,
    FactoryContactComponent,
    TaskSetComponent,
    TodosComponent,
    TaskUpdateComponent,
    TaskComponent,
    AddTaskGroupComponent,
    TaskSetDropdownComponent,
    ModalComponent,
    OrderTaskComponent,
    OrderTodosComponent,
    DatePickerComponent,
    OrderDetailComponent,
    TimeDifferenceComponent,
    DashboardComponent,
    DynamicFormRequestComponent,
    CustomerComponent,
    OrderDetailComponent,
  ],
  entryComponents: [
    DynamicFormRequestComponent,
    OrderDetailComponent

  ],
  exports: [
    CustomerTableComponent,
    OrdersTableComponent,
    FactoryTableComponent,
    TimeDifferenceComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    TaskFormService,
    TaskGroupService,
    ModalService,
    OrderTaskFormService,
    PostService,
    OptionsFormService


  ],
})
export class PagesModule { }
