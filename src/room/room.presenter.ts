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
                    amount: expense.amount
                }))
            }))
        });
    }

    presentErrorFetchRoom(): void {
        this.roomView.update({ isErrorFetchRoom: true });
    }
}