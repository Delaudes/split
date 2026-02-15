import { ExpenseDomainModel, NewExpenseDomainModel, PayerDomainModel, RoomDomainModel } from "../models/room.domain.model";
import { RoomPort } from "../room.port";

export class FakeRoomAdapter implements RoomPort {

    room = new RoomDomainModel('fake-room-id', 'fake-room-name', [
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
    roomId?: string;
    error?: unknown;
    async fetchRoom(roomId: string): Promise<RoomDomainModel> {
        if (this.error) {
            throw this.error;
        }
        this.roomId = roomId;
        return this.room;
    }

    payerId = 'fake-payer-id';
    payerName?: string;
    async addPayer(roomId: string, payerName: string): Promise<string> {
        if (this.error) {
            throw this.error;
        }
        this.roomId = roomId;
        this.payerName = payerName;
        return this.payerId;
    }

    expenseId = 'fake-expense-id';
    newExpense?: NewExpenseDomainModel;
    async addExpense(newExpense: NewExpenseDomainModel): Promise<string> {
        if (this.error) {
            throw this.error;
        }
        this.newExpense = newExpense;
        return this.expenseId;
    }

    expenseIdToDelete?: string;
    async deleteExpense(expenseId: string): Promise<void> {
        if (this.error) {
            throw this.error;
        }
        this.expenseIdToDelete = expenseId;
    }

    async deleteAllExpenses(roomId: string): Promise<void> {
        if (this.error) {
            throw this.error;
        }
        this.roomId = roomId;
    }

    newRoomName?: string;
    async editRoomName(roomId: string, newRoomName: string): Promise<void> {
        if (this.error) {
            throw this.error;
        }
        this.roomId = roomId;
        this.newRoomName = newRoomName;
    }

    newPayerName?: string;
    async editPayerName(payerId: string, newPayerName: string): Promise<void> {
        if (this.error) {
            throw this.error;
        }
        this.payerId = payerId;
        this.newPayerName = newPayerName;
    }

    payerIdToDelete?: string;
    async deletePayer(payerId: string): Promise<void> {
        if (this.error) {
            throw this.error;
        }
        this.payerIdToDelete = payerId;
    }

    roomIdToDelete?: string;
    async deleteRoom(roomId: string): Promise<void> {
        if (this.error) {
            throw this.error;
        }
        this.roomIdToDelete = roomId;
    }

    roomIdHistory?: string;
    async fetchRoomHistory(roomId: string): Promise<RoomDomainModel> {
        if (this.error) {
            throw this.error;
        }
        this.roomIdHistory = roomId;
        return this.room;
    }
}

