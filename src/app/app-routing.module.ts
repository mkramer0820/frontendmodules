import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppConfig} from './config/app.config';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: AppConfig.routes.customer, loadChildren: './modules/customers/customers.module#CustomersModule'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
