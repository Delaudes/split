import { AppParam, AppPath } from "../app/app.routes";
import { DialogPort } from "../dialog/dialog.port";
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

    async validateDeleteExpense(expenseId: string, dialog: DialogPort): Promise<void> {
        const isDeleteSuccess = await this.roomService.deleteExpense(expenseId);
        if (isDeleteSuccess) {
            dialog.close();
        }
    }

    async validateDeleteAllExpenses(dialog: DialogPort): Promise<void> {
        const roomId = this.navigationPort.getParam(AppParam.RoomId)
        const isDeleteSuccess = await this.roomService.deleteAllExpenses(roomId);
        if (isDeleteSuccess) {
            dialog.close();
        }
    }

    shareUrl(roomName: string): void {
        this.navigationPort.share({
            text: `Rejoignez ma salle de partage de dépenses : ${roomName} !\n`,
            url: location.href
        });
    }

    navigateToHome(): void {
        this.navigationPort.navigate([AppPath.Home]);
    }

    async validateEditRoomName(newRoomName: string, dialog: DialogPort): Promise<void> {
        const roomId = this.navigationPort.getParam(AppParam.RoomId)
        const editSuccess = await this.roomService.editRoomName(roomId, newRoomName);
        if (editSuccess) {
            dialog.close();
        }
    }

    async validateEditPayerName(payerId: string, newPayerName: string, dialog: DialogPort): Promise<void> {
        const editSuccess = await this.roomService.editPayerName(payerId, newPayerName);
        if (editSuccess) {
            dialog.close();
        }
    }

    async validateDeletePayer(payerId: string, dialog: DialogPort): Promise<void> {
        const isDeleteSuccess = await this.roomService.deletePayer(payerId);
        if (isDeleteSuccess) {
            dialog.close();
        }
    }

    async validateDeleteRoom(dialog: DialogPort): Promise<void> {
        const roomId = this.navigationPort.getParam(AppParam.RoomId)
        const isDeleteSuccess = await this.roomService.deleteRoom(roomId);
        if (isDeleteSuccess) {
            dialog.close();
        }
    }
}