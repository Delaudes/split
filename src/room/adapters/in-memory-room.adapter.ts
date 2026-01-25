import { RoomPort } from "../home.port";
import { PayerDomainModel, RoomDomainModel } from "../models/room.domain.model";

export class InMemoryRoomAdapter implements RoomPort {
    async fetchRoom(roomId: string): Promise<RoomDomainModel> {
        if (roomId === 'empty') {
            return new RoomDomainModel(roomId, roomId, [])
        }
        if (roomId === 'error') {
            throw new Error()
        }
        return new RoomDomainModel(roomId, 'Vacances', [
            new PayerDomainModel('1', 'Alice', [
                { id: 'a', amount: 50, description: 'Hotel' },
                { id: 'b', amount: 30, description: 'Restaurant' },
                { id: 'c', amount: 20, description: 'Museum' },
            ]),
            new PayerDomainModel('2', 'Bob', [
                { id: 'd', amount: 80, description: 'Flight' },
                { id: 'e', amount: 40, description: 'Car Rental' },
                { id: 'f', amount: 10, description: 'Snacks' },
            ]),
            new PayerDomainModel('3', 'Charlie', [
                { id: 'g', amount: 60, description: 'Accommodation' },
                { id: 'h', amount: 20, description: 'Activities' },
                { id: 'i', amount: 15, description: 'Souvenirs' }
            ]),
        ]);
    }
}