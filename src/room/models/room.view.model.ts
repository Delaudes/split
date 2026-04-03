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
    isLoadingEditRoomName: boolean;
    isErrorEditRoomName: boolean;
    isLoadingDeleteRoom: boolean;
    isErrorDeleteRoom: boolean;

    roomHistory: RoomHistoryViewModel;

    isCreateRoomLoading: boolean;
    isCreateRoomError: boolean;
    visitedRooms: VisitedRoomViewModel[];
}

export type PayerViewModel = {
    id: string;
    name: string;
    expensesCount: number;
    expensesTotal: string;
    expenses: ExpenseViewModel[];

    isLoadingEditPayerName: boolean;
    isErrorEditPayerName: boolean;
    isLoadingDeletePayer: boolean;
    isErrorDeletePayer: boolean;
}

export type ExpenseViewModel = {
    id: string;
    description: string;
    amount: string;

    isLoadingDeleteExpense: boolean;
    isErrorDeleteExpense: boolean;
    isErrorToggleExpensePayer: boolean;
    expensePayers: ExpensePayerViewModel[];
}

export type ExpensePayerViewModel = {
    id: string;
    name: string;
    isExcluded: boolean;
    isLoading: boolean;
}

export type PaymentViewModel = {
    fromPayerName: string;
    toPayerName: string;
    amount: string;
}

export type RoomHistoryViewModel = {
    payers: PayerViewModel[];

    isLoadingFetchRoomHistory: boolean;
    isErrorFetchRoomHistory: boolean;
}

export type VisitedRoomViewModel = {
    id: string;
    name: string;
}
