export class RoomDomainModel {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly payers: PayerDomainModel[]
    ) { }

    get expensesTotal(): number {
        return this.payers.reduce((sum, payer) => sum + payer.expensesTotal, 0);
    }

    get expensesAverage(): number {
        const numberOfPayers = this.payers.length;
        return numberOfPayers === 0 ? 0 : this.expensesTotal / numberOfPayers;
    }

    addPayer(payer: PayerDomainModel): void {
        this.payers.push(payer);
    }

    addExpense(expense: ExpenseDomainModel, payerId: string): void {
        const payer = this.payers.find(payer => payer.is(payerId));
        payer?.addExpense(expense);
    }

    deleteExpense(expenseId: string): void {
        this.payers.forEach(payer => {
            payer.deleteExpense(expenseId);
        });
    }

    deleteAllExpenses(): void {
        this.payers.forEach(payer => {
            payer.deleteExpenses();
        });
    }

    get payments(): PaymentDomainModel[] {
        const balances = this.payers.map(payer => ({
            name: payer.name,
            balance: payer.getBalance(this.expensesAverage)
        }));
        const creditors = balances.filter(balance => balance.balance > 0);
        const debtors = balances.filter(balance => balance.balance < 0).map(b => ({ name: b.name, balance: -b.balance }));

        const payments = [];
        let i = 0, j = 0;
        while (i < creditors.length && j < debtors.length) {
            const amount = Math.min(creditors[i].balance, debtors[j].balance);

            payments.push(new PaymentDomainModel(
                debtors[j].name,
                creditors[i].name,
                amount
            ));

            creditors[i].balance -= amount;
            debtors[j].balance -= amount;

            if (creditors[i].balance <= 0) i++;
            if (debtors[j].balance <= 0) j++;
        }
        return payments;
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

    getBalance(expensesAverage: number): number {
        return this.expensesTotal - expensesAverage;
    }

    addExpense(expense: ExpenseDomainModel): void {
        this.expenses.push(expense);
    }

    deleteExpense(expenseId: string): void {
        const expenseIndex = this.expenses.findIndex(expense => expense.is(expenseId));
        if (expenseIndex !== -1) {
            this.expenses.splice(expenseIndex, 1);
        }
    }

    deleteExpenses(): void {
        this.expenses.splice(0, this.expenses.length);
    }

    is(payerId: string): boolean {
        return this.id === payerId;
    }
}

export class ExpenseDomainModel {
    constructor(
        readonly id: string,
        readonly description: string,
        readonly amount: number
    ) { }

    is(expenseId: string): boolean {
        return this.id === expenseId;
    }
}

export class NewExpenseDomainModel {
    constructor(
        readonly description: string,
        readonly amount: number,
        readonly payerId: string
    ) { }
}

export class PaymentDomainModel {
    constructor(
        readonly fromPayerName: string,
        readonly toPayerName: string,
        readonly amount: number
    ) { }
}

export type VisitedRoomDomainModel = {
    id: string;
    name: string;
}