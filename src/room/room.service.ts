import { RoomPort } from "./home.port";
import { RoomPresenter } from "./room.presenter";

export class RoomService {
    constructor(private readonly roomPresenter: RoomPresenter, private readonly roomPort: RoomPort) { }

    async fetchRoom(roomId: string): Promise<void> {
        this.roomPresenter.startLoadingFetchRoom();
        try {
            const room = await this.roomPort.fetchRoom(roomId);
            this.roomPresenter.presentRoom(room);
        } catch {
            this.roomPresenter.presentErrorFetchRoom();
        } finally {
            this.roomPresenter.stopLoadingFetchRoom();
        }
    }
}