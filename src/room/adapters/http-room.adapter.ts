import { HttpPort } from "../../http/http.port";
import { AddPayerResponse, FetchRoomResponse } from "../models/room.api.model";
import { ExpenseDomainModel, NewExpenseDomainModel, PayerDomainModel, RoomDomainModel } from "../models/room.domain.model";
import { RoomPort } from "../room.port";

export class HttpRoomAdapter implements RoomPort {
    private readonly baseUrl = 'https://split-api-ws8o.onrender.com';

    constructor(private readonly httpPort: HttpPort) { }

    async fetchRoom(roomId: string): Promise<RoomDomainModel> {
        const fetchRoomResponse = await this.httpPort.get<FetchRoomResponse>(`${this.baseUrl}/rooms/${roomId}`);
        return this.mapToRoomDomainModel(fetchRoomResponse);
    }

    async addPayer(roomId: string, payerName: string): Promise<string> {
        const addPayerResponse = await this.httpPort.post<AddPayerResponse>(`${this.baseUrl}/rooms/payers`, {
            roomId,
            payerName
        });
        return addPayerResponse.id;
    }

    async addExpense(newExpense: NewExpenseDomainModel): Promise<string> {
        const addExpenseResponse = await this.httpPort.post<AddPayerResponse>(`${this.baseUrl}/rooms/payers/expenses`, {
            payerId: newExpense.payerId,
            expenseDescription: newExpense.description,
            expenseAmount: newExpense.amount
        });
        return addExpenseResponse.id;
    }

    async deleteExpense(expenseId: string): Promise<void> {
        await this.httpPort.delete(`${this.baseUrl}/rooms/payers/expenses/${expenseId}`);
    }

    async deleteAllExpenses(roomId: string): Promise<void> {
        await this.httpPort.delete(`${this.baseUrl}/rooms/${roomId}/payers/expenses`);
    }

    private mapToRoomDomainModel(fetchRoomResponse: FetchRoomResponse): RoomDomainModel {
        return new RoomDomainModel(
            fetchRoomResponse.id,
            fetchRoomResponse.name,
            fetchRoomResponse.payers.map(payer => new PayerDomainModel(
                payer.id,
                payer.name,
                payer.expenses.map(expense => new ExpenseDomainModel(
                    expense.id,
                    expense.description,
                    expense.amount
                ))
            ))
        );
    }

    async editRoomName(roomId: string, newRoomName: string): Promise<void> {
        await this.httpPort.put(`${this.baseUrl}/rooms/${roomId}`, { name: newRoomName });
    }

    async editPayerName(payerId: string, newPayerName: string): Promise<void> {
        await this.httpPort.put(`${this.baseUrl}/rooms/payers/${payerId}`, { name: newPayerName });
    }

    async deletePayer(payerId: string): Promise<void> {
        await this.httpPort.delete(`${this.baseUrl}/rooms/payers/${payerId}`);
    }

    async deleteRoom(roomId: string): Promise<void> {
        await this.httpPort.delete(`${this.baseUrl}/rooms/${roomId}`);
    }
}