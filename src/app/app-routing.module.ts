import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {AppConfig} from './config/app.config';
import {CustomerAddFormComponent} from './pages/customer/customer-add/customer-add-form.component';
import {CustomerTableComponent} from './pages/customer/customer-table/customer-table.component';
import {OrdersTableComponent} from './pages/orders/orders-table/orders-table.component';
import {OrdersAddComponent} from './pages/orders/orders-add/orders-add.component';
import {OrdersUpdateComponent} from './pages/orders/orders-update/orders-update.component';
import {OrdersImageUploadComponent} from './pages/orders/orders-image-upload/orders-image-upload.component';
import {CustomersComponent} from './modules/customers/customers/customers.component';
// import {HomePage} from './core/pages/home/home.page';
// import {Error404Page} from './core/pages/error404/error404.page';

const routes: Routes = [
  {path: '', redirectTo: '/customer-table', pathMatch: 'full'},
  {path: 'customer-add', component: CustomerAddFormComponent},
  {path: 'customer-table', component: CustomerTableComponent},
  {path: 'order-table', component: OrdersTableComponent},
  {path: 'order-add', component: OrdersAddComponent},
  {path: 'order-update', component: OrdersUpdateComponent},
  {path: 'order-image-upload', component: OrdersImageUploadComponent},
  {path: 'test-customer', component: CustomersComponent},

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
