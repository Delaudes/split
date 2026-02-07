import { HttpPort } from "../../http/http.port";
import { HomePort } from "../home.port";
import { CreateRoomRequest, CreateRoomResponse } from "../models/home.api.model";

export class HttpHomeAdapter implements HomePort {
    constructor(private readonly httpPort: HttpPort) { }

    async createRoom(roomName: string): Promise<string> {
        const createRoomResponse = await this.httpPort.post<CreateRoomResponse>("https://split-api-ws8o.onrender.com/rooms", this.createRoomRequest(roomName));
        return createRoomResponse.id
    }

    private createRoomRequest(roomName: string): CreateRoomRequest {
        return {
            name: roomName
        }
    }
}