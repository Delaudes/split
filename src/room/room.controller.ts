import { AppParam, AppPath } from "../app/app.routes";
import { NavigationPort } from "../navigation/navigation.port";
import { RoomService } from "./room.service";

export class RoomController {
    constructor(
        private readonly roomService: RoomService, private readonly navigationPort: NavigationPort
    ) { }

    async fetchRoom(): Promise<void> {
        const roomId = this.navigationPort.getParam(AppParam.RoomId)
        if (roomId) {
            await this.roomService.fetchRoom(roomId);
            return;
        }
        this.navigationPort.navigate([AppPath.Home]);
    }
}