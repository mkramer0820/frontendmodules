import { JpDynamicFormComponent } from './forms/components/jp-dynamic-form/jp-dynamic-form.component';
import { JpFormsComponent } from './forms/components/jp-forms.component';
import {FactoryBaseComponent} from './forms/factory/factory-base/factory-base.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {AppConfig} from './config/app.config';
import {CustomerTableComponent} from './pages/customer/customer-table/customer-table.component';
import {FactoryTableComponent} from './pages/factory/factory-table/factory-table.component';
import {OrdersTableComponent} from './pages/orders/orders-table/orders-table.component';
import {OrdersAddComponent} from './pages/orders/orders-add/orders-add.component';
import {OrdersUpdateComponent} from './pages/orders/orders-update/orders-update.component';
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
  {path: 'order-add', component: OrdersAddComponent, canActivate: [AuthGuard]},
  {path: 'order-update', component: OrdersUpdateComponent, canActivate: [AuthGuard]},
  {path: 'test-customer', component: CustomersComponent, canActivate: [AuthGuard]},
  {path: 'factory-contact', component: FactoryContactComponent, canActivate: [AuthGuard]},

  { path: 'login', component: LoginComponent },
  { path: 'add-task-group', component: AddTaskGroupComponent },
  { path: 'task-form', component: DynamicComponent },
  { path: 'task', component: TaskComponent },
  { path: 'task-update', component: TaskUpdateComponent },
  { path: 'task-test', component: TaskComponent },
  { path: 'jp-task-forms-component', component: JpFormsComponent },
  { path: 'task-component', component: TaskSetComponent},
  { path: 'order-task', component: OrderTaskComponent},
  { path: 'home', component: DashboardComponent},
  { path: 'factory-create', component: FactoryBaseComponent},


  //{ path: 'task-form', component: DynamicFormComponent },
  //{ path: 'task-form-dynamic', component: DynamicFormTaskComponent },
  // {path: '', component: HomePage},
  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // {path: AppConfig.routes.error404, component: Error404Page},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
