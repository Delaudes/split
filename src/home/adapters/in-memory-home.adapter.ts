import { HomePort } from "../home.port";

export class InMemoryHomeAdapter implements HomePort {
    async createRoom(roomName: string): Promise<string> {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (roomName === "error") {
            throw new Error();
        }

        return crypto.randomUUID();
    }
}