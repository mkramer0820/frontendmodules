import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppConfig} from './config/app.config';
import {CustomerAddFormComponent} from './pages/customer/customer-add/customer-add-form.component';
import {CustomerTableComponent} from './pages/customer/customer-table/customer-table.component';
// import {HomePage} from './core/pages/home/home.page';
// import {Error404Page} from './core/pages/error404/error404.page';

const routes: Routes = [
  {path: '', redirectTo: '/customer-table', pathMatch: 'full'},
  {path: 'customer-add', component: CustomerAddFormComponent},
  {path: 'customer-table', component: CustomerTableComponent},
  // {path: '', component: HomePage},
  // {path: AppConfig.routes.error404, component: Error404Page},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
