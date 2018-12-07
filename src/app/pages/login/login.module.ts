import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'app/shared/shared.module';
import {LoginComponent} from './login.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }
