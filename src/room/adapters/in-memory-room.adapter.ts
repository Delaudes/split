import { ExpenseDomainModel, NewExpenseDomainModel, PayerDomainModel, RoomDomainModel } from "../models/room.domain.model";
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

        return new RoomDomainModel(roomId, 'Vacances de la famille', [
            new PayerDomainModel('1', 'Alice', [
                new ExpenseDomainModel('a', 'Hotel', 50),
                new ExpenseDomainModel('b', 'Restaurant', 30),
                new ExpenseDomainModel('c', 'Museum', 20),
            ]),
            new PayerDomainModel('2', 'Bob', [
                new ExpenseDomainModel('d', 'Flight', 80),
                new ExpenseDomainModel('e', 'Car Rental', 40),
                new ExpenseDomainModel('f', 'Snacks', 15),
            ]),
            new PayerDomainModel('3', 'Charlie', [
                new ExpenseDomainModel('g', 'Accommodation', 60),
                new ExpenseDomainModel('h', 'Activities', 20),
                new ExpenseDomainModel('i', 'Souvenirs', 15),
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

    async addExpense(newExpense: NewExpenseDomainModel): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (newExpense.description === 'error') {
            throw new Error()
        }

        return crypto.randomUUID();
    }

    async deleteExpense(expenseId: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (expenseId === 'a') {
            throw new Error()
        }
    }

    async deleteAllExpenses(roomId: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (roomId === 'error-delete-all') {
            throw new Error()
        }
    }

    async editRoomName(roomId: string, newRoomName: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (newRoomName === 'error') {
            throw new Error()
        }
    }
}