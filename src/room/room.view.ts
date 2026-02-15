import { AppPath } from "../app/app.routes";
import { NavigationPort } from "../navigation/navigation.port";
import { SignalPort } from "../signal/signal.port";
import { RoomViewModel } from "./models/room.view.model";

export class RoomView {
    constructor(public roomViewModel: SignalPort<RoomViewModel>, private readonly navigationPort: NavigationPort) {
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

            isLoadingDeleteRoom: false,
            isErrorDeleteRoom: false,

            roomHistory: {
                payers: [],

                isLoadingFetchRoomHistory: false,
                isErrorFetchRoomHistory: false,
            }
        });
    }

    update(partial: Partial<RoomViewModel>): void {
        const current = this.roomViewModel.get();
        this.roomViewModel.set({ ...current, ...partial });
    }

    navigateToHome(): void {
        this.navigationPort.navigate([AppPath.Home]);
    }
}