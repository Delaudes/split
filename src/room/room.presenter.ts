import { RoomDomainModel } from "./models/room.domain.model";
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
            roomId: room.id,
            roomName: room.name,
            payers: room.payers.map(payer => ({
                id: payer.id,
                name: payer.name,
                expensesCount: payer.expensesCount,
                expensesTotal: payer.expensesTotal.toFixed(2),
                expenses: payer.expenses.map(expense => ({
                    id: expense.id,
                    description: expense.description,
                    amount: expense.amount.toFixed(2),
                    isLoadingDeleteExpense: false,
                    isErrorDeleteExpense: false,
                })),
                isLoadingEditPayerName: false,
                isErrorEditPayerName: false,
                isLoadingDeletePayer: false,
                isErrorDeletePayer: false,
            })),
            expensesTotal: room.expensesTotal.toFixed(2),
            expensesAverage: room.expensesAverage.toFixed(2),
            payments: room.payments.map(payment => ({
                fromPayerName: payment.fromPayerName,
                toPayerName: payment.toPayerName,
                amount: payment.amount.toFixed(2)
            })),
            isErrorAddPayer: false,
            isErrorAddExpense: false,
            isErrorDeleteAllExpenses: false,
            isErrorEditRoomName: false,
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

    presentErrorAddPayer(): void {
        this.roomView.update({ isErrorAddPayer: true });
    }

    startLoadingAddExpense(): void {
        this.roomView.update({ isLoadingAddExpense: true });
    }

    stopLoadingAddExpense(): void {
        this.roomView.update({ isLoadingAddExpense: false });
    }

    presentErrorAddExpense(): void {
        this.roomView.update({ isErrorAddExpense: true });
    }

    startLoadingDeleteExpense(expenseId: string): void {
        this.roomView.update({
            payers: this.roomView.roomViewModel.get().payers.map(payer => ({
                ...payer,
                expenses: payer.expenses.map(expense => ({
                    ...expense,
                    isLoadingDeleteExpense: expense.id === expenseId ? true : expense.isLoadingDeleteExpense
                }))
            }))
        })
    }

    stopLoadingDeleteExpense(expenseId: string): void {
        this.roomView.update({
            payers: this.roomView.roomViewModel.get().payers.map(payer => ({
                ...payer,
                expenses: payer.expenses.map(expense => ({
                    ...expense,
                    isLoadingDeleteExpense: expense.id === expenseId ? false : expense.isLoadingDeleteExpense
                }))
            }))
        });
    }

    presentErrorDeleteExpense(expenseId: string): void {
        this.roomView.update({
            payers: this.roomView.roomViewModel.get().payers.map(payer => ({
                ...payer,
                expenses: payer.expenses.map(expense => ({
                    ...expense,
                    isErrorDeleteExpense: expense.id === expenseId ? true : expense.isErrorDeleteExpense
                }))
            }))
        });
    }

    startLoadingDeleteAllExpenses(): void {
        this.roomView.update({ isLoadingDeleteAllExpenses: true });
    }

    stopLoadingDeleteAllExpenses(): void {
        this.roomView.update({ isLoadingDeleteAllExpenses: false });
    }

    presentErrorDeleteAllExpenses(): void {
        this.roomView.update({ isErrorDeleteAllExpenses: true });
    }

    startLoadingEditRoomName(): void {
        this.roomView.update({ isLoadingEditRoomName: true });
    }

    stopLoadingEditRoomName(): void {
        this.roomView.update({ isLoadingEditRoomName: false });
    }

    presentErrorEditRoomName(): void {
        this.roomView.update({ isErrorEditRoomName: true });
    }

    startLoadingEditPayerName(payerId: string): void {
        this.roomView.update({
            payers: this.roomView.roomViewModel.get().payers.map(payer => ({
                ...payer,
                isLoadingEditPayerName: payer.id === payerId ? true : payer.isLoadingEditPayerName
            }))
        });
    }

    stopLoadingEditPayerName(payerId: string): void {
        this.roomView.update({
            payers: this.roomView.roomViewModel.get().payers.map(payer => ({
                ...payer,
                isLoadingEditPayerName: payer.id === payerId ? false : payer.isLoadingEditPayerName
            }))
        });
    }

    presentErrorEditPayerName(payerId: string): void {
        this.roomView.update({
            payers: this.roomView.roomViewModel.get().payers.map(payer => ({
                ...payer,
                isErrorEditPayerName: payer.id === payerId ? true : payer.isErrorEditPayerName
            }))
        });
    }

    startLoadingDeletePayer(payerId: string): void {
        this.roomView.update({
            payers: this.roomView.roomViewModel.get().payers.map(payer => ({
                ...payer,
                isLoadingDeletePayer: payer.id === payerId ? true : payer.isLoadingDeletePayer
            }))
        });
    }

    stopLoadingDeletePayer(payerId: string): void {
        this.roomView.update({
            payers: this.roomView.roomViewModel.get().payers.map(payer => ({
                ...payer,
                isLoadingDeletePayer: payer.id === payerId ? false : payer.isLoadingDeletePayer
            }))
        });
    }

    presentErrorDeletePayer(payerId: string): void {
        this.roomView.update({
            payers: this.roomView.roomViewModel.get().payers.map(payer => ({
                ...payer,
                isErrorDeletePayer: payer.id === payerId ? true : payer.isErrorDeletePayer
            }))
        });
    }

    startLoadingDeleteRoom(): void {
        this.roomView.update({ isLoadingDeleteRoom: true });
    }

    stopLoadingDeleteRoom(): void {
        this.roomView.update({ isLoadingDeleteRoom: false });
    }

    presentErrorDeleteRoom(): void {
        this.roomView.update({ isErrorDeleteRoom: true });
    }

    presentHome(): void {
        this.roomView.navigateToHome();
    }
}