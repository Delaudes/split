import { AppPath } from "../app/app.routes";
import { NavigationPort } from "../navigation/navigation.port";
import { SignalPort } from "../signal/signal.port";
import { HomeViewModel } from "./models/home.view.model";

export class HomeView {
    constructor(public homeViewModel: SignalPort<HomeViewModel>, private readonly navigationPort: NavigationPort) {
        homeViewModel.set({
            isCreateRoomLoading: false,
            isCreateRoomError: false,
            visitedRooms: []
        });
    }

    update(partial: Partial<HomeViewModel>): void {
        const current = this.homeViewModel.get();
        this.homeViewModel.set({ ...current, ...partial });
    }

    navigateToRoom(roomId: string): void {
        this.navigationPort.navigate([AppPath.Rooms, roomId]);
    }
}