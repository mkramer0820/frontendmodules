import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'app/shared/shared.module';
import {OrdersTableComponent} from './orders-table/orders-table.component';
import {OrderCardsComponent} from './orders-table/order-cards/order-cards.component';
import {OrderTaskComponent} from './order-task/order-task.component';
import {OrderTodosComponent} from './order-task/order-todos/order-todos.component';
import {OrderTaskFormService} from './order-task/_service/order-task-form.service';
import {OrderExpenseComponent} from './order-expense/order-expense.component';
import {ExpenseFormService} from './order-expense/_service/expense-form.service';
import {OrderExpenseItemComponent} from './order-expense/order-expense-item/order-expense-item.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {OrderService} from './orders-table/_service/order.service';
import {JpFormsModule} from 'app/forms/jp-forms.module';
import {AppRoutingModule} from 'app/app-routing.module';
import {TimeDifferenceComponent} from '../_directives/time-diff/time-difference/time-difference.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JpFormsModule,
    AppRoutingModule,
  ],
  declarations: [
    OrdersTableComponent,
    OrderTaskComponent,
    OrderTodosComponent,
    OrderExpenseComponent,
    OrderExpenseItemComponent,
    OrderDetailComponent,
    OrderCardsComponent,
    TimeDifferenceComponent,


  ],
  providers: [
    OrderService,
    OrderTaskFormService,
    ExpenseFormService,
  ]
})
export class OrdersModule { }
