import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ExpenseForm, ExpenseItemForm } from '../_models/expense-form.model';
import { Expense, ExpenseItem } from '../_models/expense.model';
import {HttpClientService} from '../../../../_services/http-client.service';
import { AppConfig } from '../../../../config/app.config';
import { map, take } from 'rxjs/operators';


@Injectable()
export class ExpenseFormService {

  private expense: any;
  private expenseItems: any;

  private expenseForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(this.fb.group(new ExpenseForm(new Expense())));
  expenseForm$: Observable<FormGroup> = this.expenseForm.asObservable();

 

  constructor(private fb: FormBuilder, private httpClient: HttpClientService,) { }

  addExpenseItems() {
    const currentExpense = this.expenseForm.getValue();
    let currentExpenseItems = currentExpense.get('expenseItems') as FormArray;
        
    currentExpenseItems.push(
      this.fb.group(
        new ExpenseItemForm(new ExpenseItem())
      )
    );

    this.expenseForm.next(currentExpense);
  }
  deleteExepnseItem(i: number) {
    const currentExpense = this.expenseForm.getValue();
    const currentExpenseItems = currentExpense.get('expenseItems') as FormArray;


    currentExpenseItems.removeAt(i);
    
    this.expenseForm.next(currentExpense);
  }

  getExpenseItemTotals(totals: any[]) {   
    totals = totals.reduce((sum, current) => sum + current);
    return totals;
  }

  clearForm() {
    const currentExpense = this.expenseForm.getValue();
    const currentExpenseItems = currentExpense.get('expenseItems') as FormArray;
    while (currentExpenseItems.length !== 0) {
        currentExpenseItems.removeAt(0);
      }
  }
  clearExpenseItems() {
    const currentExpense = this.expenseForm.getValue();
    const currentExpenseItems = currentExpense.get('expenseItems') as FormArray;
    while (currentExpenseItems.length !== 0) {
      currentExpenseItems.removeAt(0);
   }
 }

}

