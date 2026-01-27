import { AppParam } from "../app/app.routes";
import { NavigationPort } from "../navigation/navigation.port";
import { NewExpenseDomainModel } from "./models/room.domain.model";
import { RoomService } from "./room.service";

export class RoomController {
    constructor(
        private readonly roomService: RoomService, private readonly navigationPort: NavigationPort
    ) { }

    async fetchRoom(): Promise<void> {
        const roomId = this.navigationPort.getParam(AppParam.RoomId)
        await this.roomService.fetchRoom(roomId);
    }

    async addPayer(payerName: string): Promise<void> {
        const roomId = this.navigationPort.getParam(AppParam.RoomId)
        await this.roomService.addPayer(roomId, payerName);
    }

    async addExpense(expenseDescription: string, amount: string, payerId: string): Promise<void> {
        const newExpense = new NewExpenseDomainModel(expenseDescription, Number(Number(amount).toFixed(2)), payerId);
        await this.roomService.addExpense(newExpense);
    }

    async deleteExpense(expenseId: string): Promise<void> {
        await this.roomService.deleteExpense(expenseId);
    }
}