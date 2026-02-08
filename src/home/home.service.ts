import { SPLIT_ROOMS_KEY } from "../storage/storage.key";
import { StoragePort } from "../storage/storage.port";
import { HomePort } from "./home.port";
import { HomePresenter } from "./home.presenter";
import { VisitedRoomDomainModel } from "./models/home.domain.model";

export class HomeService {
    constructor(private readonly homePresenter: HomePresenter, private readonly homePort: HomePort, private readonly storagePort: StoragePort) { }

    async createRoom(roomName: string): Promise<void> {
        this.homePresenter.startLoadingCreateRoom();
        try {
            const roomId = await this.homePort.createRoom(roomName);
            this.homePresenter.presentRoom(roomId);
        } catch {
            this.homePresenter.presentErrorCreateRoom();
        } finally {
            this.homePresenter.stopLoadingCreateRoom();
        }
    }

    loadVisitedRooms(): void {
        const visitedRooms = this.storagePort.get<VisitedRoomDomainModel[]>(SPLIT_ROOMS_KEY);
        this.homePresenter.presentVisitedRooms(visitedRooms ?? []);
    }

    selectRoom(roomId: string): void {
        this.homePresenter.presentRoom(roomId);
    }
}