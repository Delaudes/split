import { RoomDomainModel } from "./models/room.domain.model";

export interface RoomPort {
    fetchRoom(roomId: string): Promise<RoomDomainModel>;
    addPayer(roomId: string, payerName: string): Promise<string>;
}