import { HomePort } from "../home.port";

export class FakeHomeAdapter implements HomePort {

    roomId = 'fake-room-id';
    roomName?: string;
    error?: unknown
    async createRoom(roomName: string): Promise<string> {
        if (this.error) {
            throw this.error;
        }
        this.roomName = roomName;
        return this.roomId;
    }
}