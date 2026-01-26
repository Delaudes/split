import { PayerDomainModel, RoomDomainModel } from "../models/room.domain.model";
import { RoomPort } from "../room.port";

export class InMemoryRoomAdapter implements RoomPort {
    async fetchRoom(roomId: string): Promise<RoomDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (roomId === 'no-payer') {
            return new RoomDomainModel(roomId, roomId, [])
        }

        if (roomId === 'no-expense') {
            return new RoomDomainModel(roomId, roomId, [
                new PayerDomainModel('1', 'Alice', []),
            ]);
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

    async addPayer(roomId: string, payerName: string): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (payerName === 'error') {
            throw new Error()
        }

        return crypto.randomUUID();
    }
}