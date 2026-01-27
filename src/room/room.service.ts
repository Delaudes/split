import { ExpenseDomainModel, NewExpenseDomainModel, PayerDomainModel } from "./models/room.domain.model";
import { RoomPort } from "./room.port";
import { RoomPresenter } from "./room.presenter";

export class RoomService {
    constructor(private readonly roomPresenter: RoomPresenter, private readonly roomPort: RoomPort) { }

    async fetchRoom(roomId: string): Promise<void> {
        this.roomPresenter.startLoadingFetchRoom();
        try {
            const room = await this.roomPort.fetchRoom(roomId);
            this.roomPresenter.presentRoom(room);
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
            this.roomPresenter.presentPayer(new PayerDomainModel(payerId, payerName, []));
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
            this.roomPresenter.presentExpense(new ExpenseDomainModel(
                expenseId,
                newExpense.description,
                newExpense.amount,
            ), newExpense.payerId
            );
        } catch {
            this.roomPresenter.presentErrorAddExpense();
        } finally {
            this.roomPresenter.stopLoadingAddExpense();
        }
    }

    async deleteExpense(expenseId: string): Promise<void> {
        this.roomPresenter.startLoadingDeleteExpense();
        try {
            await this.roomPort.deleteExpense(expenseId);
            this.roomPresenter.presentDeletingExpense(expenseId);
        } catch {
            this.roomPresenter.presentErrorDeleteExpense();
        } finally {
            this.roomPresenter.stopLoadingDeleteExpense();
        }
    }
}