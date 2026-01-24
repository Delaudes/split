import { HomeService } from "./home.service";

export class HomeController {
    constructor(
        private readonly homeService: HomeService
    ) { }

    async createRoom(roomName: string): Promise<void> {
        await this.homeService.createRoom(roomName);
    }
}