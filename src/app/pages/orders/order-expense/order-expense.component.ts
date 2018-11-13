import { Component, OnInit, OnDestroy, AfterViewInit, Input, Inject} from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder,  } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExpenseFormService } from './_service/expense-form.service';
import { HttpClientService } from '../../../_services/http-client.service';
import {MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {Expense, ExpenseItem} from './_models/expense.model';
import {ExpenseForm, ExpenseItemForm} from './_models/expense-form.model';

import { Router} from '@angular/router';

export interface DialogData {
  order: any;
  url: string;
  update: boolean;
}

@Component({
  selector: 'app-order-expense',
  templateUrl: './order-expense.component.html',
  styleUrls: ['./order-expense.component.scss']
})
export class OrderExpenseComponent implements OnInit, OnDestroy {
    // Message from task.component

    // end of message propery
    
    expenseForm: FormGroup;
    expenseFormSub: Subscription;
  
    // set_name: FormGroup;
    totalCost: number;
    expenseItems: FormArray;
    message: string;
    orderExpense = {};
    selectedId: any;
    qty: number;
    expenseGrandTotal: number[];
    orderId: string;
    update: boolean;
    currentExpenseItems: any;
    totalExpense: number;
  
  
    constructor(
      private expenseFormService: ExpenseFormService,
      private httpClient: HttpClientService,
      private dialog: MatDialog,
      private fb: FormBuilder,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
  
    ) { this.qty = data.order.qty; 
      this.orderId = this.data.order.id;
      this.update = this.data.update;
     }
  
  
    ngOnInit() {
      this.expenseFormSub = this.expenseFormService.expenseForm$
      .subscribe(expense => {
          this.expenseForm = expense;
          this.expenseItems = this.expenseForm.get('expenseItems') as FormArray;
        });
      this.expenseForm.get('order').setValue(this.orderId)
      this.updateExpenseItems();
      }
    ngAfterViewInit() {
      this.expenseFormSub = this.expenseFormService.expenseForm$
      .subscribe(expense => {
          this.expenseForm = expense;
          this.expenseItems = this.expenseForm.get('expenseItems') as FormArray;
      });
    }
    ngOnDestroy() {
      this.expenseFormSub.unsubscribe();
      this.clearExpenseForm()
    } 
    
    calculatGrandTotal() {
      this.expenseForm.value;

      console.log(this.expenseForm.value);
    }

    addExpenseItems() {
      this.expenseFormService.addExpenseItems();
    }
    deleteExpenseItems(index: number) {
      this.expenseFormService.deleteExepnseItem(index);
    }
    
    calculatTotals() {
      let itemTotal = this.expenseForm.get('expenseItems').value;
      let grandTotal: any[] = [];
      itemTotal.forEach(function (item) {
        let total =  item.expenseItemTotal;
        grandTotal.push(total)
      })
      grandTotal = grandTotal.reduce((sum, current) => sum + current);
      this.expenseForm.get('totalExpense').setValue(grandTotal);
    }
        /**
     * After a form is initialized, we link it to our main form
     */

    saveExpenseForm() {
      this.calculatTotals();
      if (this.update === true) {
        this.httpClient.put(`${this.data.url + this.orderId}/`, this.expenseForm.value)
        .subscribe(response => {
          console.log(response);
          this.clearExpenseForm();
        })
      } else {
        this.httpClient.post(`${this.data.url}`, this.expenseForm.value)
        .subscribe(response => {
          console.log(response);
          this.clearExpenseForm();
        })
      }
      this.clearExpenseForm();
    }


    clearExpenseForm() {
      // this.taskFormService.clearForm();
      this.expenseFormService.clearForm();
    }


    updateExpenseListItems() {

    }
    updateExpenseItems() {
      if (this.update) {
        this.currentExpenseItems = this.data.order.orderExpense[0];
        console.log(this.currentExpenseItems);
        let expenseItemList = this.currentExpenseItems.expenseItems;
        let currentExpenseItem = this.expenseForm.get('expenseItems') as FormArray;

        for (let item of expenseItemList) {
          let expItem = new ExpenseItem(item.expenseItemName, item.expenseItemCost, this.qty);
          currentExpenseItem.push(
            this.fb.group(
              new ExpenseItemForm(expItem)
              )
            );
          } 
        }
      }
  }

/*

updateBlanketTask(selectedtodos) {
  const todos =  selectedtodos;
  this.selectedOrderTask = selectedtodos;
  this.updateId = selectedtodos['id'];
  this.orderTFS.clearForm();
  if (this.ordertaskForm.get('todos').value.length === 0) {
    for (const todo in todos) {
      if (todos.hasOwnProperty(todo)) {
        const todoslist =  todos[todo];
        // const currentTask = this.taskForm.getValue();
        const currentTodos = this.ordertaskForm.get('todos') as FormArray;
        currentTodos.push(
        this.fb.group(
          new OrderTaskTodosForm(
            new OrderTaskTodo(todoslist['todo'],todoslist['comment'], todoslist['duedate'], todoslist['status']  ))
        )
      );
      } else {console.log('field'); }
    }
  }
}*/