import { AppPath } from "../app/app.routes";
import { Dialog } from "../dialog/dialog";
import { NavigationPort } from "../navigation/navigation.port";
import { HomeService } from "./home.service";

export class HomeController {
    constructor(
        private readonly homeService: HomeService,
        private readonly navigationPort: NavigationPort
    ) { }

    navigateToHome(): void {
        this.navigationPort.navigate([AppPath.Home]);
    }

    async createRoom(roomName: string): Promise<void> {
        await this.homeService.createRoom(roomName);
    }

    async loadVisitedRooms(): Promise<void> {
        this.homeService.loadVisitedRooms();
    }

    selectRoom(roomId: string): void {
        this.homeService.selectRoom(roomId);
    }

    forgetRoom(roomId: string, dialog: Dialog): void {
        this.homeService.forgetRoom(roomId);
        dialog.close();
    }
}