export class RoomDomainModel {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly payers: PayerDomainModel[]
    ) { }

    addPayer(payer: PayerDomainModel): void {
        this.payers.push(payer);
    }

    addExpense(expense: ExpenseDomainModel, payerId: string): void {
        const payer = this.payers.find(p => p.id === payerId);
        payer?.addExpense(expense);
    }

    deleteExpense(expenseId: string): void {
        this.payers.forEach(payer => {
            payer.deleteExpense(expenseId);
        });
    }
}

export class PayerDomainModel {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly expenses: ExpenseDomainModel[]
    ) { }

    get expensesCount(): number {
        return this.expenses.length;
    }

    get expensesTotal(): number {
        return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    addExpense(expense: ExpenseDomainModel): void {
        this.expenses.push(expense);
    }

    deleteExpense(expenseId: string): void {
        const expenseIndex = this.expenses.findIndex(expense => expense.id === expenseId);
        if (expenseIndex !== -1) {
            this.expenses.splice(expenseIndex, 1);
        }
    }
}

export class ExpenseDomainModel {
    constructor(
        readonly id: string,
        readonly description: string,
        readonly amount: number
    ) { }
}

export class NewExpenseDomainModel {
    constructor(
        readonly description: string,
        readonly amount: number,
        readonly payerId: string
    ) { }
}
