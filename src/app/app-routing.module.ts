import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {AppConfig} from './config/app.config';
import {CustomerAddFormComponent} from './pages/customer/customer-add/customer-add-form.component';
import {CustomerTableComponent} from './pages/customer/customer-table/customer-table.component';
import {FactoryAddComponent} from './pages/factory/factory-add/factory-add.component';
import {FactoryTableComponent} from './pages/factory/factory-table/factory-table.component';
import {OrdersTableComponent} from './pages/orders/orders-table/orders-table.component';
import {OrdersAddComponent} from './pages/orders/orders-add/orders-add.component';
import {OrdersUpdateComponent} from './pages/orders/orders-update/orders-update.component';
//import {OrdersImageUploadComponent} from './pages/orders/orders-image-upload/orders-image-upload.component';
import {CustomersComponent} from './modules/customers/customers/customers.component';
import {LoginComponent} from './pages/login/login.component';
import { AuthGuard } from './pages/_guards';
import { FactoryContactComponent } from './pages/factory/factory-contact/factory-contact.component';
import {TasksetComponent} from './pages/task/taskset/taskset.component';

// import {HomePage} from './core/pages/home/home.page';
// import {Error404Page} from './core/pages/error404/error404.page';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'customer-add', component: CustomerAddFormComponent, canActivate: [AuthGuard]},
  {path: 'customer-table', component: CustomerTableComponent, canActivate: [AuthGuard]},
  {path: 'factory-add', component: FactoryAddComponent, canActivate: [AuthGuard]},
  {path: 'factory-table', component: FactoryTableComponent, canActivate: [AuthGuard]},
  {path: 'order-table', component: OrdersTableComponent, canActivate: [AuthGuard]},
  {path: 'order-add', component: OrdersAddComponent, canActivate: [AuthGuard]},
  {path: 'order-update', component: OrdersUpdateComponent, canActivate: [AuthGuard]},
  {path: 'task-set', component:TasksetComponent, canActivate:[AuthGuard]},
  //{path: 'order-image-upload', component: OrdersImageUploadComponent},
  {path: 'test-customer', component: CustomersComponent, canActivate: [AuthGuard]},
  {path: 'factory-contact', component: FactoryContactComponent, canActivate: [AuthGuard]},
  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // {path: '', component: HomePage},

  // {path: AppConfig.routes.error404, component: Error404Page},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
