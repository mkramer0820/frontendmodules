import { JpDynamicFormComponent } from './forms/components/jp-dynamic-form/jp-dynamic-form.component';
import { JpFormsComponent } from './forms/components/jp-forms.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {AppConfig} from './config/app.config';
import {CustomerTableComponent} from './pages/customer/customer-table/customer-table.component';
import {FactoryTableComponent} from './pages/factory/factory-table/factory-table.component';
import {OrdersTableComponent} from './pages/orders/orders-table/orders-table.component';
import {CustomersComponent} from './modules/customers/customers/customers.component';
import {LoginComponent} from './pages/login/login.component';
import { AuthGuard } from './pages/_guards';
import { FactoryContactComponent } from './pages/factory/factory-contact/factory-contact.component';
import {AddTaskGroupComponent} from './pages/task/add-task-group/add-task-group.component';
import {TaskComponent} from './pages/task/task.component';
import {TaskSetComponent} from './pages/task/create-task-set/task-set.component';
import {TaskUpdateComponent} from './pages/task/create-task-set/task-update/task-update.component';
import {DynamicComponent} from './modules/dynamicform/dynamic/dynamic.component';
import { OrderTaskComponent } from './pages/orders/order-task/order-task.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'customer-table', component: CustomerTableComponent, canActivate: [AuthGuard]},
  {path: 'factory-table', component: FactoryTableComponent, canActivate: [AuthGuard]},
  {path: 'order-table', component: OrdersTableComponent, canActivate: [AuthGuard]},
  {path: 'test-customer', component: CustomersComponent, canActivate: [AuthGuard]},
  {path: 'factory-contact', component: FactoryContactComponent, canActivate: [AuthGuard]},

  { path: 'login', component: LoginComponent },
  { path: 'add-task-group', component: AddTaskGroupComponent, canActivate: [AuthGuard] },
  { path: 'task-form', component: DynamicComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'task-update', component: TaskUpdateComponent },
  { path: 'task-test', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'jp-task-forms-component', component: JpFormsComponent, canActivate: [AuthGuard] },
  { path: 'task-component', component: TaskSetComponent, canActivate: [AuthGuard]},
  { path: 'order-task', component: OrderTaskComponent, canActivate: [AuthGuard]},
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
