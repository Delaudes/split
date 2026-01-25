import { HomePort } from "../home.port";

export class FakeHomeAdapter implements HomePort {
    roomName?: string;
    roomId = 'fake-room-id';
    error?: unknown

    async createRoom(roomName: string): Promise<string> {
        if (this.error) {
            throw this.error;
        }
        this.roomName = roomName;
        return this.roomId;
    }
}