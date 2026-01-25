export type RoomViewModel = {
    isLoadingFetchRoom: boolean;
    isErrorFetchRoom: boolean;
    roomId: string;
    roomName: string;
    payers: PayerViewModel[]
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
    amount: number;
}