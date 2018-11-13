import { FormControl, Validators, FormArray } from '@angular/forms'
import { Expense, ExpenseItem } from './expense.model';

export class ExpenseForm {
  order = new FormControl()
  totalExpense = new FormControl();
  expenseItems = new FormArray([]);

  constructor(expense?: Expense) {
    if (expense.expenseItems) {
      this.expenseItems.setValue([expense.expenseItems]);
    }
  }
}

export class ExpenseItemForm {
    expenseItemName = new FormControl()
    expenseItemCost = new FormControl()
    expenseItemTotal = new FormControl()
    qty: number;
    constructor(
      expenseItem?: ExpenseItem,
      qty?: number,
    ) {
      this.expenseItemName.setValue(expenseItem.itemName);
      this.expenseItemCost.setValue(expenseItem.itemCost);
      this.expenseItemTotal.setValue(expenseItem.itemTotal);

    }

    calcCost(qty: number) {
        let cost = this.expenseItemCost.value * qty;
        return cost;
    }

  }
  