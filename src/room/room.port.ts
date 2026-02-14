import { NewExpenseDomainModel, RoomDomainModel } from "./models/room.domain.model";

export interface RoomPort {
    fetchRoom(roomId: string): Promise<RoomDomainModel>;
    addPayer(roomId: string, payerName: string): Promise<string>;
    addExpense(newExpense: NewExpenseDomainModel): Promise<string>;
    deleteExpense(expenseId: string): Promise<void>;
    deleteAllExpenses(roomId: string): Promise<void>;
    editRoomName(roomId: string, newRoomName: string): Promise<void>;
    editPayerName(payerId: string, newPayerName: string): Promise<void>;
    deletePayer(payerId: string): Promise<void>;
    deleteRoom(roomId: string): Promise<void>;
}