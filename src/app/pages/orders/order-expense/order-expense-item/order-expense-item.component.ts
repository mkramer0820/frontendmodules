import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {HttpClientService} from '../../../../_services/http-client.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ExpenseItem, Expense } from '../_models/expense.model';
import { ExpenseItemForm } from '../_models/expense-form.model';


@Component({
  selector: 'app-order-expense-item',
  templateUrl: './order-expense-item.component.html',
  styleUrls: ['./order-expense-item.component.scss']
})
export class OrderExpenseItemComponent implements OnInit {

  status = ['na', 'started', 'complete']

  @Input() expenseItemForm: FormGroup;
  @Input() index: number;
  @Input() selectedId: any;
  @Output() delExpenseItems: EventEmitter<number> = new EventEmitter();
  @Output() sentExpenseItemsTotal: EventEmitter<number> = new EventEmitter();
  @Output() totals: EventEmitter<number> = new EventEmitter();

  @Input() quantity: number;
  totalCost: number;

    constructor(private httpClient: HttpClientService, private fb: FormBuilder) { }

    ngOnInit() {

    }
    /*ngOnChanges() {
      this.todos;
    }*/

    calcTotal(event$: any) {
      let total = +event$ * 1000;
      this.totalCost = total;
    }
    onKey(event: any) { // without type info
      let total = this.expenseItemForm.get('expenseItemCost').value
      this.totalCost = event.target.value * this.quantity;
      this.expenseItemForm.get('expenseItemTotal').setValue(this.totalCost);
      this.sendTotal()
    }
    delete() {
      this.delExpenseItems.emit(this.index);
    }

    sendTotal() { // without type info
      let total = this.expenseItemForm.get('expenseItemTotal').value
      this.totals.emit(total);
    }


}
