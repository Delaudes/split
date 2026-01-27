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
}

export type PayerViewModel = {
    id: string;
    name: string;
    expensesCount: number;
    expensesTotal: number;
    expenses: ExpenseViewModel[];
}

export type ExpenseViewModel = {
    id: string;
    description: string;
    amount: string;
}