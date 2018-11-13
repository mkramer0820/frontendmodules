import { Component, OnInit, OnDestroy, AfterViewInit, Input, Inject} from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder,  } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExpenseFormService } from './_service/expense-form.service';
import { HttpClientService } from '../../../_services/http-client.service';
import {MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {Expense, ExpenseItem} from './_models/expense.model'
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
export class OrderExpenseComponent implements OnInit {
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
  
  
    constructor(
      private expenseFormService: ExpenseFormService,
      private httpClient: HttpClientService,
      private dialog: MatDialog,
      private fb: FormBuilder,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
  
    ) { this.qty = data.order.qty }
  
  
    ngOnInit() {
      this.expenseFormSub = this.expenseFormService.expenseForm$
      .subscribe(expense => {
          this.expenseForm = expense;
          this.expenseItems = this.expenseForm.get('expenseItems') as FormArray;
        });
      }
    ngAfterViewInit() {
      this.expenseFormSub = this.expenseFormService.expenseForm$
      .subscribe(expense => {
          this.expenseForm = expense;
          this.expenseItems = this.expenseForm.get('expenseItems') as FormArray;
      });
    }
    ngOnDestroy() {
      // this.taskFormSub.unsubscribe();
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
      console.log('Todo saved!');
      console.log(this.expenseForm.value);
      this.calculatTotals();
      this.expenseForm.get('id').setValue(this.data.order.id);
      console.log(this.expenseForm.value)
      this.httpClient.put(`${this.data.url + this.data.order.id}/`, this.expenseForm.value)
      .subscribe(response => {
        console.log(response);
      })
    }
    getExpenseItems(){
      // get expenseItems for updatre
    }
    addToOrder() {
      // add expense to orders
    }

    clearTodosForm() {
      // this.taskFormService.clearForm();
      this.expenseFormService.clearForm();
    }


    updateExpenseList() {
      // update the expense list
    }

}
