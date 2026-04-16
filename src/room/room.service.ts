import { SPLIT_ROOMS_KEY } from "../storage/storage.key";
import { StoragePort } from "../storage/storage.port";
import { ExpenseDomainModel, NewExpenseDomainModel, PayerDomainModel, RoomDomainModel, VisitedRoomDomainModel } from "./models/room.domain.model";
import { RoomPort } from "./room.port";
import { RoomPresenter } from "./room.presenter";

export class RoomService {
    private room: RoomDomainModel = new RoomDomainModel('', '', []);

    constructor(private readonly roomPresenter: RoomPresenter, private readonly roomPort: RoomPort, private readonly storagePort: StoragePort) { }

    async fetchRoom(roomId: string): Promise<void> {
        this.roomPresenter.startLoadingFetchRoom();
        try {
            this.room = await this.roomPort.fetchRoom(roomId);
            this.addVisitedRoomToStorage();
            this.roomPresenter.presentRoom(this.room);
        } catch {
            this.roomPresenter.presentErrorFetchRoom();
        } finally {
            this.roomPresenter.stopLoadingFetchRoom();
        }
    }

    private addVisitedRoomToStorage(): void {
        const visitedRooms = this.storagePort.get<VisitedRoomDomainModel[]>(SPLIT_ROOMS_KEY);
        if (visitedRooms?.some(room => room.id === this.room.id)) {
            return;
        }
        const visitedRoom: VisitedRoomDomainModel = { id: this.room.id, name: this.room.name };
        const newVisitedRooms = visitedRooms ? [...visitedRooms, visitedRoom] : [visitedRoom];
        this.storagePort.set(SPLIT_ROOMS_KEY, newVisitedRooms);
    }

    async addPayer(roomId: string, payerName: string): Promise<void> {
        this.roomPresenter.startLoadingAddPayer();
        try {
            const payerId = await this.roomPort.addPayer(roomId, payerName);
            this.room.addPayer(new PayerDomainModel(payerId, payerName, []));
            this.roomPresenter.presentRoom(this.room);
        } catch {
            this.roomPresenter.presentErrorAddPayer();
        } finally {
            this.roomPresenter.stopLoadingAddPayer();
        }
    }

    async addExpense(newExpense: NewExpenseDomainModel): Promise<boolean> {
        this.roomPresenter.startLoadingAddExpense();
        try {
            const expenseId = await this.roomPort.addExpense(newExpense);
            this.room.addExpense(new ExpenseDomainModel(
                expenseId,
                newExpense.description,
                newExpense.amount,
                []
            ), newExpense.payerId);
            this.roomPresenter.presentRoom(this.room);
            return true;
        } catch {
            this.roomPresenter.presentErrorAddExpense();
            return false;
        } finally {
            this.roomPresenter.stopLoadingAddExpense();
        }
    }

    async deleteExpense(expenseId: string): Promise<boolean> {
        this.roomPresenter.startLoadingDeleteExpense(expenseId);
        try {
            await this.roomPort.deleteExpense(expenseId);
            this.room.deleteExpense(expenseId);
            this.roomPresenter.presentRoom(this.room);
            return true
        } catch {
            this.roomPresenter.presentErrorDeleteExpense(expenseId);
            return false
        } finally {
            this.roomPresenter.stopLoadingDeleteExpense(expenseId);
        }
    }

    async deleteAllExpenses(roomId: string): Promise<boolean> {
        this.roomPresenter.startLoadingDeleteAllExpenses();
        try {
            await this.roomPort.deleteAllExpenses(roomId);
            this.room.deleteAllExpenses();
            this.roomPresenter.presentRoom(this.room);
            return true
        } catch {
            this.roomPresenter.presentErrorDeleteAllExpenses();
            return false
        } finally {
            this.roomPresenter.stopLoadingDeleteAllExpenses();
        }
    }

    async editRoomName(roomId: string, newRoomName: string): Promise<boolean> {
        this.roomPresenter.startLoadingEditRoomName();
        try {
            await this.roomPort.editRoomName(roomId, newRoomName);
            this.room.name = newRoomName;
            const visitedRooms = this.storagePort.get<VisitedRoomDomainModel[]>(SPLIT_ROOMS_KEY) ?? [];
            const updatedVisitedRooms = visitedRooms.map(room => room.id === roomId ? { ...room, name: newRoomName } : room);
            this.storagePort.set(SPLIT_ROOMS_KEY, updatedVisitedRooms);
            this.roomPresenter.presentRoom(this.room);
            return true
        } catch {
            this.roomPresenter.presentErrorEditRoomName();
            return false
        } finally {
            this.roomPresenter.stopLoadingEditRoomName();
        }
    }

    async editPayerName(payerId: string, newPayerName: string): Promise<boolean> {
        this.roomPresenter.startLoadingEditPayerName(payerId);
        try {
            await this.roomPort.editPayerName(payerId, newPayerName);
            this.room.editPayerName(payerId, newPayerName);
            this.roomPresenter.presentRoom(this.room);
            return true
        } catch {
            this.roomPresenter.presentErrorEditPayerName(payerId);
            return false
        } finally {
            this.roomPresenter.stopLoadingEditPayerName(payerId);
        }
    }

    async deletePayer(payerId: string): Promise<boolean> {
        this.roomPresenter.startLoadingDeletePayer(payerId);
        try {
            await this.roomPort.deletePayer(payerId);
            this.room.deletePayer(payerId);
            this.roomPresenter.presentRoom(this.room);
            return true
        } catch {
            this.roomPresenter.presentErrorDeletePayer(payerId);
            return false
        } finally {
            this.roomPresenter.stopLoadingDeletePayer(payerId);
        }
    }

    async deleteRoom(roomId: string): Promise<boolean> {
        this.roomPresenter.startLoadingDeleteRoom();
        try {
            await this.roomPort.deleteRoom(roomId);
            const visitedRooms = this.storagePort.get<VisitedRoomDomainModel[]>(SPLIT_ROOMS_KEY) ?? [];
            const updatedVisitedRooms = visitedRooms.filter(room => room.id !== roomId);
            this.storagePort.set(SPLIT_ROOMS_KEY, updatedVisitedRooms);
            this.roomPresenter.presentHome();
            return true
        } catch {
            this.roomPresenter.presentErrorDeleteRoom();
            return false
        } finally {
            this.roomPresenter.stopLoadingDeleteRoom();
        }
    }

    async fetchRoomHistory(roomId: string): Promise<void> {
        this.roomPresenter.startLoadingFetchRoomHistory();
        try {
            const roomHistory = await this.roomPort.fetchRoomHistory(roomId);
            this.roomPresenter.presentRoomHistory(roomHistory);
        } catch {
            this.roomPresenter.presentErrorFetchRoomHistory();
        } finally {
            this.roomPresenter.stopLoadingFetchRoomHistory();
        }
    }

    async createRoom(roomName: string): Promise<void> {
        this.roomPresenter.startLoadingCreateRoom();
        try {
            const roomId = await this.roomPort.createRoom(roomName);
            this.roomPresenter.presentNavigateToRoom(roomId);
        } catch {
            this.roomPresenter.presentErrorCreateRoom();
        } finally {
            this.roomPresenter.stopLoadingCreateRoom();
        }
    }

    loadVisitedRooms(): void {
        const visitedRooms = this.storagePort.get<VisitedRoomDomainModel[]>(SPLIT_ROOMS_KEY);
        this.roomPresenter.presentVisitedRooms(visitedRooms ?? []);
    }

    selectRoom(roomId: string): void {
        this.roomPresenter.presentNavigateToRoom(roomId);
    }

    forgetRoom(roomId: string): void {
        const visitedRooms = this.storagePort.get<VisitedRoomDomainModel[]>(SPLIT_ROOMS_KEY) ?? [];
        const updatedVisitedRooms = visitedRooms.filter(room => room.id !== roomId);
        this.storagePort.set(SPLIT_ROOMS_KEY, updatedVisitedRooms);
        this.roomPresenter.presentVisitedRooms(updatedVisitedRooms);
    }

    async toggleExpensePayer(expenseId: string, payerId: string, isExcluded: boolean): Promise<void> {
        this.roomPresenter.startLoadingToggleExpensePayer(expenseId, payerId);
        try {
            if (isExcluded) {
                await this.roomPort.includeExpensePayer(expenseId, payerId);
                this.room.includeExpensePayer(expenseId, payerId);
                this.roomPresenter.presentRoom(this.room);
                return;
            }
            await this.roomPort.excludeExpensePayer(expenseId, payerId);
            this.room.excludeExpensePayer(expenseId, payerId);
            this.roomPresenter.presentRoom(this.room);
        } catch {
            this.roomPresenter.presentErrorToggleExpensePayer(expenseId);
        } finally {
            this.roomPresenter.stopLoadingToggleExpensePayer(expenseId, payerId);
        }
    }
}