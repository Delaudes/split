import { HomePort } from "./home.port";
import { HomePresenter } from "./home.presenter";

export class HomeService {
    constructor(private readonly homePresenter: HomePresenter, private readonly homePort: HomePort) { }

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
}