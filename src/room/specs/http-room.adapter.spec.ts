import { FakeHttpWrapper } from "../../http/fake-http.wrapper";
import { HttpRoomAdapter } from "../adapters/http-room.adapter";
import { ExpenseDomainModel, PayerDomainModel, RoomDomainModel } from "../models/room.domain.model";

describe('http room adapter', () => {
    let httpRoomAdapter: HttpRoomAdapter;
    let fakeHttpWrapper: FakeHttpWrapper;

    beforeEach(() => {
        fakeHttpWrapper = new FakeHttpWrapper();
        httpRoomAdapter = new HttpRoomAdapter(fakeHttpWrapper);
    });

    it('should fetch room with correct url', async () => {
        const roomId = 'fake-room-id';
        fakeHttpWrapper.getResponse = createFetchRoomResponse(roomId);
        const expectedRoom = createExpectedRoom(roomId);

        const room = await httpRoomAdapter.fetchRoom(roomId);

        expect(fakeHttpWrapper.lastGetUrl).toBe(`https://split-api-ws8o.onrender.com/rooms/${roomId}`);
        expect(room).toEqual(expectedRoom);
    });

    it('should add payer with correct url and body', async () => {
        const roomId = 'fake-room-id';
        const payerName = 'fake-payer-name';
        const expectedPayerId = 'fake-payer-id';
        fakeHttpWrapper.postResponse = { id: expectedPayerId };

        const payerId = await httpRoomAdapter.addPayer(roomId, payerName);

        expect(fakeHttpWrapper.lastPostUrl).toBe(`https://split-api-ws8o.onrender.com/rooms/payers`);
        expect(fakeHttpWrapper.lastPostBody).toEqual({ roomId, payerName });
        expect(payerId).toBe(expectedPayerId);
    });

    it('should add expense with correct url and body', async () => {
        const newExpense = { payerId: 'fake-payer-id', description: 'fake-expense-description', amount: 100 };
        const expectedExpenseId = 'fake-expense-id';
        fakeHttpWrapper.postResponse = { id: expectedExpenseId };

        const expenseId = await httpRoomAdapter.addExpense(newExpense);

        expect(fakeHttpWrapper.lastPostUrl).toBe(`https://split-api-ws8o.onrender.com/rooms/payers/expenses`);
        expect(fakeHttpWrapper.lastPostBody).toEqual({ payerId: newExpense.payerId, expenseDescription: newExpense.description, expenseAmount: newExpense.amount });
        expect(expenseId).toBe(expectedExpenseId);
    });

    it('should delete expense with correct url', async () => {
        const expenseId = 'fake-expense-id';

        await httpRoomAdapter.deleteExpense(expenseId);

        expect(fakeHttpWrapper.lastDeleteUrl).toBe(`https://split-api-ws8o.onrender.com/rooms/payers/expenses/${expenseId}`);
    });

    it('should delete all expenses with correct url', async () => {
        const roomId = 'fake-room-id';

        await httpRoomAdapter.deleteAllExpenses(roomId);

        expect(fakeHttpWrapper.lastDeleteUrl).toBe(`https://split-api-ws8o.onrender.com/rooms/${roomId}/payers/expenses`);
    });

    it('should edit room name with correct url and body', async () => {
        const roomId = 'fake-room-id';
        const newRoomName = 'new-fake-room-name';

        await httpRoomAdapter.editRoomName(roomId, newRoomName);

        expect(fakeHttpWrapper.lastPutUrl).toBe(`https://split-api-ws8o.onrender.com/rooms/${roomId}`);
        expect(fakeHttpWrapper.lastPutBody).toEqual({ name: newRoomName });
    });

    it('should edit payer name with correct url and body', async () => {
        const payerId = 'fake-payer-id';
        const newPayerName = 'new-fake-payer-name';

        await httpRoomAdapter.editPayerName(payerId, newPayerName);

        expect(fakeHttpWrapper.lastPutUrl).toBe(`https://split-api-ws8o.onrender.com/rooms/payers/${payerId}`);
        expect(fakeHttpWrapper.lastPutBody).toEqual({ name: newPayerName });
    });

    it('should delete payer with correct url', async () => {
        const payerId = 'fake-payer-id';

        await httpRoomAdapter.deletePayer(payerId);

        expect(fakeHttpWrapper.lastDeleteUrl).toBe(`https://split-api-ws8o.onrender.com/rooms/payers/${payerId}`);
    });

    it('should delete room with correct url', async () => {
        const roomId = 'fake-room-id';

        await httpRoomAdapter.deleteRoom(roomId);

        expect(fakeHttpWrapper.lastDeleteUrl).toBe(`https://split-api-ws8o.onrender.com/rooms/${roomId}`);
    });

    function createFetchRoomResponse(roomId: string) {
        return {
            id: roomId, name: 'fake-room-name', payers: [
                {
                    id: 'fake-payer-id', name: 'fake-payer-name', expenses: [
                        { id: 'fake-expense-id', description: 'fake-expense-description', amount: 100 },
                        { id: 'fake-expense-id-1', description: 'fake-expense-description-1', amount: 20 }
                    ]
                },
                {
                    id: 'fake-payer-id-2', name: 'fake-payer-name-2', expenses: [
                        { id: 'fake-expense-id-2', description: 'fake-expense-description-2', amount: 50 },
                        { id: 'fake-expense-id-3', description: 'fake-expense-description-3', amount: 30 }
                    ]
                }
            ]
        };
    }

    function createExpectedRoom(roomId: string) {
        return new RoomDomainModel(
            roomId,
            'fake-room-name',
            [new PayerDomainModel(
                'fake-payer-id',
                'fake-payer-name',
                [
                    new ExpenseDomainModel('fake-expense-id', 'fake-expense-description', 100),
                    new ExpenseDomainModel('fake-expense-id-1', 'fake-expense-description-1', 20)
                ]
            ),
            new PayerDomainModel(
                'fake-payer-id-2',
                'fake-payer-name-2',
                [
                    new ExpenseDomainModel('fake-expense-id-2', 'fake-expense-description-2', 50),
                    new ExpenseDomainModel('fake-expense-id-3', 'fake-expense-description-3', 30)
                ]
            )]
        );
    }
})