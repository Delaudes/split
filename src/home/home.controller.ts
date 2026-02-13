import { HomeService } from "./home.service";

export class HomeController {
    constructor(
        private readonly homeService: HomeService
    ) { }

    async createRoom(roomName: string): Promise<void> {
        await this.homeService.createRoom(roomName);
    }

    async loadVisitedRooms(): Promise<void> {
        this.homeService.loadVisitedRooms();
    }

    selectRoom(roomId: string): void {
        this.homeService.selectRoom(roomId);
    }

    forgetRoom(roomId: string): void {
        this.homeService.forgetRoom(roomId);
    }
}