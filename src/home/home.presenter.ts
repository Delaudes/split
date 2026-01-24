import { HomeView } from "./home.view";

export class HomePresenter {
    constructor(private readonly homeView: HomeView) { }

    startLoadingCreateRoom(): void {
        this.homeView.update({ isCreateRoomLoading: true });
    }

    stopLoadingCreateRoom(): void {
        this.homeView.update({ isCreateRoomLoading: false });
    }

    presentErrorCreateRoom(): void {
        this.homeView.update({ isCreateRoomError: true });
    }

    presentRoom(roomId: string): void {
        this.homeView.update({ isCreateRoomError: false });
        this.homeView.navigateToRoom(roomId);
    }
}