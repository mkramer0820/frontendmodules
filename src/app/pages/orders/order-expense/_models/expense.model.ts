

export class Expense {
    order?: string;
    totalExpense?: number;
    expenseItems?: ExpenseItem[];

    constructor(order?: string, total?: number, expenseItems?: ExpenseItem[]) {
        this.order = order;
        this.totalExpense = total;
        this.expenseItems = expenseItems;
    }

    calculatExpenseList() {
        let totals = [];
        for (let expenseItem of this.expenseItems) {
            totals.push(expenseItem.itemTotal)
        }
    }
}


export class ExpenseItem {
    
    itemName: string;
    itemCost: number;
    itemTotal: number;


    constructor(itemName?: string, itemCost?: number, quantity?: number) {
        this.itemName = itemName || "";
        this.itemCost = itemCost || 0;
        this.itemTotal = this.calculatTotal(quantity);
    }

    calculatTotal(quantity) {
        return this.itemTotal = this.itemCost * quantity;
    }
}
