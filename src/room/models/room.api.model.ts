export type AddExpenseResponse = {
    id: string
}

export type AddPayerResponse = {
    id: string
}

export type FetchRoomResponse = {
    id: string;
    name: string;
    payers: {
        id: string;
        name: string;
        expenses: {
            id: string;
            description: string;
            amount: number;
        }[]
    }[]
}

export type AddExpenseRequest = {
    payerId: string;
    expenseDescription: string;
    expenseAmount: number;
}

export type AddPayerRequest = {
    roomId: string;
    payerName: string;
}