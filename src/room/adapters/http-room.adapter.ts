import { HttpPort } from "../../http/http.port";
import { AddExpenseRequest, AddPayerRequest, AddPayerResponse, FetchRoomResponse } from "../models/room.api.model";
import { ExpenseDomainModel, NewExpenseDomainModel, PayerDomainModel, RoomDomainModel } from "../models/room.domain.model";
import { RoomPort } from "../room.port";

export class HttpRoomAdapter implements RoomPort {
    constructor(private readonly httpPort: HttpPort) { }

    async fetchRoom(roomId: string): Promise<RoomDomainModel> {
        const fetchRoomResponse = await this.httpPort.get<FetchRoomResponse>(`https://split-api-ws8o.onrender.com/rooms/${roomId}`);
        return this.mapToRoomDomainModel(fetchRoomResponse);
    }

    async addPayer(roomId: string, payerName: string): Promise<string> {
        const addPayerResponse = await this.httpPort.post<AddPayerResponse>(`https://split-api-ws8o.onrender.com/rooms/payers`, this.addPayerRequest(roomId, payerName));
        return addPayerResponse.id;
    }

    async addExpense(newExpense: NewExpenseDomainModel): Promise<string> {
        const addExpenseResponse = await this.httpPort.post<AddPayerResponse>(`https://split-api-ws8o.onrender.com/rooms/payers/expenses`, this.addExpenseRequest(newExpense));
        return addExpenseResponse.id;
    }

    async deleteExpense(expenseId: string): Promise<void> {
        await this.httpPort.delete(`https://split-api-ws8o.onrender.com/rooms/payers/expenses/${expenseId}`);
    }

    async deleteAllExpenses(roomId: string): Promise<void> {
        await this.httpPort.delete(`https://split-api-ws8o.onrender.com/rooms/${roomId}/payers/expenses`);
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

    private addPayerRequest(roomId: string, payerName: string): AddPayerRequest {
        return {
            roomId,
            payerName
        }
    }

    private addExpenseRequest(newExpense: NewExpenseDomainModel): AddExpenseRequest {
        return {
            payerId: newExpense.payerId,
            expenseDescription: newExpense.description,
            expenseAmount: newExpense.amount
        }
    }
}