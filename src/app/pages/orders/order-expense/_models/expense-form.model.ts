import { FormControl, Validators, FormArray } from '@angular/forms'
import { Expense, ExpenseItem } from './expense.model';

export class ExpenseForm {
  id = new FormControl()
  totalExpense = new FormControl();
  expenseItems = new FormArray([]);

  constructor(expense: Expense) {
    if (expense.expenseItems) {
      this.expenseItems.setValue([expense.expenseItems]);
    }
  }
}

export class ExpenseItemForm {
    expenseItemName = new FormControl()
    expenseItemCost = new FormControl()
    expenseItemTotal = new FormControl()
    constructor(
      expenseItem: ExpenseItem,
    ) {
      this.expenseItemName.setValue(expenseItem.itemName);
      this.expenseItemCost.setValue(expenseItem.itemCost);

    }

    calcCost() {
        let cost = this.expenseItemCost.value * 100;
        return cost;
    }

  }
  