import { HttpPort } from "../../http/http.port";
import { HomePort } from "../home.port";
import { CreateRoomResponse } from "../models/home.api.model";

export class HttpHomeAdapter implements HomePort {
    private readonly baseUrl = 'https://split-api-ws8o.onrender.com';

    constructor(private readonly httpPort: HttpPort) { }

    async createRoom(roomName: string): Promise<string> {
        const createRoomResponse = await this.httpPort.post<CreateRoomResponse>(`${this.baseUrl}/rooms`, { name: roomName });
        return createRoomResponse.id
    }

}