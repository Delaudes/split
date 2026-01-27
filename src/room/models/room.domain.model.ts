export class RoomDomainModel {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly payers: PayerDomainModel[]
    ) { }
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
