export class RoomDomainModel {
    constructor(
        readonly id: string,
        public name: string,
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
            balance: payer.getBalance(this.payers)
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

    editName(newRoomName: string): void {
        this.name = newRoomName;
    }

    editPayerName(payerId: string, newPayerName: string): void {
        const payer = this.payers.find(payer => payer.is(payerId));
        if (payer) {
            payer.editName(newPayerName);
        }
    }

    deletePayer(payerId: string): void {
        const payerIndex = this.payers.findIndex(payer => payer.is(payerId));
        if (payerIndex !== -1) {
            this.payers.splice(payerIndex, 1);
        }
    }

    excludeExpensePayer(expenseId: string, payerId: string): void {
        this.payers.forEach(payer => payer.excludeExpensePayer(expenseId, payerId));
    }

    includeExpensePayer(expenseId: string, payerId: string): void {
        this.payers.forEach(payer => payer.includeExpensePayer(expenseId, payerId));
    }
}

export class PayerDomainModel {
    constructor(
        readonly id: string,
        public name: string,
        readonly expenses: ExpenseDomainModel[]
    ) { }

    get expensesLength(): number {
        return this.expenses.length;
    }

    get expensesTotal(): number {
        return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
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

    getBalance(roomPayers: PayerDomainModel[]): number {
        const roomExpenses = roomPayers.flatMap(payer => payer.expenses);
        const totalToPay = roomExpenses
            .reduce((sum, roomExpense) => {
                if (roomExpense.isIncludedPayers(this.id)) {
                    return sum + roomExpense.getAmountPerPayer(roomPayers.length);
                }
                return sum;
            }, 0);

        return this.expensesTotal - totalToPay;
    }

    deleteExpenses(): void {
        this.expenses.splice(0, this.expenses.length);
    }

    is(payerId: string): boolean {
        return this.id === payerId;
    }

    editName(newPayerName: string): void {
        this.name = newPayerName;
    }

    excludeExpensePayer(expenseId: string, payerId: string): void {
        const expense = this.expenses.find(e => e.is(expenseId));
        expense?.addExcludedPayer(payerId);
    }

    includeExpensePayer(expenseId: string, payerId: string): void {
        const expense = this.expenses.find(e => e.is(expenseId));
        expense?.deleteExcludedPayer(payerId);
    }
}

export class ExpenseDomainModel {
    constructor(
        readonly id: string,
        readonly description: string,
        readonly amount: number,
        public excludedPayersId: string[]
    ) { }

    is(expenseId: string): boolean {
        return this.id === expenseId;
    }

    deleteExcludedPayer(payerId: string): void {
        const index = this.excludedPayersId.indexOf(payerId);
        if (index !== -1) this.excludedPayersId.splice(index, 1);
    }

    addExcludedPayer(payerId: string): void {
        this.excludedPayersId.push(payerId);
    }

    isIncludedPayers(payerId: string): boolean {
        return !this.excludedPayersId.includes(payerId);
    }

    getAmountPerPayer(roomPayersLength: number): number {
        return this.amount / (roomPayersLength - this.excludedPayersId.length);
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