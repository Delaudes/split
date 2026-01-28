import { ExpenseDomainModel, NewExpenseDomainModel, PayerDomainModel, RoomDomainModel } from "./models/room.domain.model";
import { RoomPort } from "./room.port";
import { RoomPresenter } from "./room.presenter";

export class RoomService {
    private room: RoomDomainModel = new RoomDomainModel('', '', []);

    constructor(private readonly roomPresenter: RoomPresenter, private readonly roomPort: RoomPort) { }

    async fetchRoom(roomId: string): Promise<void> {
        this.roomPresenter.startLoadingFetchRoom();
        try {
            this.room = await this.roomPort.fetchRoom(roomId);
            this.roomPresenter.presentRoom(this.room);
        } catch {
            this.roomPresenter.presentErrorFetchRoom();
        } finally {
            this.roomPresenter.stopLoadingFetchRoom();
        }
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

    async addExpense(newExpense: NewExpenseDomainModel): Promise<void> {
        this.roomPresenter.startLoadingAddExpense();
        try {
            const expenseId = await this.roomPort.addExpense(newExpense);
            this.room.addExpense(new ExpenseDomainModel(
                expenseId,
                newExpense.description,
                newExpense.amount,
            ), newExpense.payerId);
            this.roomPresenter.presentRoom(this.room);
        } catch {
            this.roomPresenter.presentErrorAddExpense();
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
}