import { AppParam } from "../app/app.routes";
import { Dialog } from "../dialog/dialog";
import { NavigationPort } from "../navigation/navigation.port";
import { NewExpenseDomainModel } from "./models/room.domain.model";
import { RoomService } from "./room.service";

export class RoomController {
    constructor(
        private readonly roomService: RoomService,
        private readonly navigationPort: NavigationPort
    ) { }

    async createRoom(roomName: string): Promise<void> {
        await this.roomService.createRoom(roomName);
    }

    async loadVisitedRooms(): Promise<void> {
        this.roomService.loadVisitedRooms();
    }

    selectRoom(roomId: string): void {
        this.roomService.selectRoom(roomId);
    }

    forgetRoom(roomId: string, dialog: Dialog): void {
        this.roomService.forgetRoom(roomId);
        dialog.close();
    }

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

    async validateDeleteExpense(expenseId: string, dialog: Dialog): Promise<void> {
        const isDeleteSuccess = await this.roomService.deleteExpense(expenseId);
        if (isDeleteSuccess) {
            dialog.close();
        }
    }

    async validateDeleteAllExpenses(dialog: Dialog): Promise<void> {
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

    async validateEditRoomName(newRoomName: string, dialog: Dialog): Promise<void> {
        const roomId = this.navigationPort.getParam(AppParam.RoomId)
        const editSuccess = await this.roomService.editRoomName(roomId, newRoomName);
        if (editSuccess) {
            dialog.close();
        }
    }

    async validateEditPayerName(payerId: string, newPayerName: string, dialog: Dialog): Promise<void> {
        const editSuccess = await this.roomService.editPayerName(payerId, newPayerName);
        if (editSuccess) {
            dialog.close();
        }
    }

    async validateDeletePayer(payerId: string, dialog: Dialog): Promise<void> {
        const isDeleteSuccess = await this.roomService.deletePayer(payerId);
        if (isDeleteSuccess) {
            dialog.close();
        }
    }

    async validateDeleteRoom(dialog: Dialog): Promise<void> {
        const roomId = this.navigationPort.getParam(AppParam.RoomId)
        const isDeleteSuccess = await this.roomService.deleteRoom(roomId);
        if (isDeleteSuccess) {
            dialog.close();
        }
    }

    async fetchRoomHistory(): Promise<void> {
        const roomId = this.navigationPort.getParam(AppParam.RoomId)
        await this.roomService.fetchRoomHistory(roomId);
    }

    async toggleExpensePayer(expenseId: string, payerId: string, isExcluded: boolean): Promise<void> {
        await this.roomService.toggleExpensePayer(expenseId, payerId, isExcluded);
    }
}