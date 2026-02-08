import { HomeView } from "./home.view";
import { VisitedRoomDomainModel } from "./models/home.domain.model";

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
        this.homeView.navigateToRoom(roomId);
    }

    presentVisitedRooms(visitedRooms: VisitedRoomDomainModel[]): void {
        this.homeView.update({ visitedRooms });
    }
}