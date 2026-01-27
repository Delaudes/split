import { ExpenseDomainModel, PayerDomainModel, RoomDomainModel } from "./models/room.domain.model";
import { RoomView } from "./room.view";

export class RoomPresenter {
    constructor(private readonly roomView: RoomView) { }

    startLoadingFetchRoom(): void {
        this.roomView.update({ isLoadingFetchRoom: true });
    }

    stopLoadingFetchRoom(): void {
        this.roomView.update({ isLoadingFetchRoom: false });
    }

    presentRoom(room: RoomDomainModel): void {
        this.roomView.update({
            isErrorFetchRoom: false,
            roomId: room.id,
            roomName: room.name,
            payers: room.payers.map(payer => ({
                id: payer.id,
                name: payer.name,
                expensesCount: payer.expensesCount,
                expensesTotal: payer.expensesTotal,
                expenses: payer.expenses.map(expense => ({
                    id: expense.id,
                    description: expense.description,
                    amount: expense.amount.toFixed(2)
                }))
            }))
        });
    }

    presentErrorFetchRoom(): void {
        this.roomView.update({ isErrorFetchRoom: true });
    }

    startLoadingAddPayer(): void {
        this.roomView.update({ isLoadingAddPayer: true });
    }

    stopLoadingAddPayer(): void {
        this.roomView.update({ isLoadingAddPayer: false });
    }

    presentPayer(payer: PayerDomainModel): void {
        this.roomView.update({
            isErrorAddPayer: false,
            payers: [...this.roomView.roomViewModel.get().payers, {
                id: payer.id,
                name: payer.name,
                expensesCount: payer.expensesCount,
                expensesTotal: payer.expensesTotal,
                expenses: payer.expenses.map(expense => ({
                    id: expense.id,
                    description: expense.description,
                    amount: expense.amount.toFixed(2)
                }))
            }]
        });
    }

    presentErrorAddPayer(): void {
        this.roomView.update({ isErrorAddPayer: true });
    }

    startLoadingAddExpense(): void {
        this.roomView.update({ isLoadingAddExpense: true });
    }

    stopLoadingAddExpense(): void {
        this.roomView.update({ isLoadingAddExpense: false });
    }

    presentExpense(expense: ExpenseDomainModel, payerId: string): void {
        this.roomView.update({
            isErrorAddExpense: false,
            payers: this.roomView.roomViewModel.get().payers.map(payer => {
                if (payer.id === payerId) {
                    return {
                        ...payer,
                        expensesCount: payer.expensesCount + 1,
                        expensesTotal: payer.expensesTotal + expense.amount,
                        expenses: [
                            ...payer.expenses,
                            {
                                id: expense.id,
                                description: expense.description,
                                amount: expense.amount.toFixed(2)
                            }
                        ]
                    };
                }
                return payer;
            })
        });
    }

    presentErrorAddExpense(): void {
        this.roomView.update({ isErrorAddExpense: true });
    }

    startLoadingDeleteExpense(): void {
        this.roomView.update({ isLoadingDeleteExpense: true });
    }

    stopLoadingDeleteExpense(): void {
        this.roomView.update({ isLoadingDeleteExpense: false });
    }

    presentDeletingExpense(expenseId: string): void {
        this.roomView.update({
            isErrorDeleteExpense: false,
            payers: this.roomView.roomViewModel.get().payers.map(payer => {
                const expenseToDelete = payer.expenses.find(expense => expense.id === expenseId);
                if (expenseToDelete) {
                    return {
                        ...payer,
                        expensesCount: payer.expensesCount - 1,
                        expensesTotal: payer.expensesTotal - Number(expenseToDelete.amount),
                        expenses: payer.expenses.filter(expense => expense.id !== expenseId)
                    };
                }
                return payer;
            })
        });
    }

    presentErrorDeleteExpense(): void {
        this.roomView.update({ isErrorDeleteExpense: true });
    }
}