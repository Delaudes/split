export type RoomViewModel = {
    isLoadingFetchRoom: boolean;
    isErrorFetchRoom: boolean;
    roomId: string;
    roomName: string;
    payers: PayerViewModel[]

    isLoadingAddPayer: boolean;
    isErrorAddPayer: boolean;

    isLoadingAddExpense: boolean;
    isErrorAddExpense: boolean;

    expensesTotal: string;
    expensesAverage: string;
    payments: PaymentViewModel[];

    isLoadingDeleteAllExpenses: boolean;
    isErrorDeleteAllExpenses: boolean;
}

export type PayerViewModel = {
    id: string;
    name: string;
    expensesCount: number;
    expensesTotal: string;
    expenses: ExpenseViewModel[];
}

export type ExpenseViewModel = {
    id: string;
    description: string;
    amount: string;
    isLoadingDeleteExpense: boolean;
    isErrorDeleteExpense: boolean;
}

export type PaymentViewModel = {
    fromPayerName: string;
    toPayerName: string;
    amount: string;
}