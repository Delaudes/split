import { SignalPort } from "../signal/signal.port";
import { RoomViewModel } from "./models/room.view.model";

export class RoomView {
    constructor(public roomViewModel: SignalPort<RoomViewModel>) {
        roomViewModel.set({
            isLoadingFetchRoom: false,
            isErrorFetchRoom: false,
            roomId: '',
            roomName: '',
            payers: [],

            isLoadingAddPayer: false,
            isErrorAddPayer: false,

            isLoadingAddExpense: false,
            isErrorAddExpense: false,

            expensesTotal: '',
            expensesAverage: '',
            payments: [],

            isLoadingDeleteAllExpenses: false,
            isErrorDeleteAllExpenses: false,

            isLoadingEditRoomName: false,
            isErrorEditRoomName: false,
        });
    }

    update(partial: Partial<RoomViewModel>): void {
        const current = this.roomViewModel.get();
        this.roomViewModel.set({ ...current, ...partial });
    }
}