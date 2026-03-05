import { Builder } from "builder-pattern";
import { AppPath } from "../../app/app.routes";
import { FakeDialog } from "../../dialog/fake-dialog.adapter";
import { FakeNavigationWrapper } from "../../navigation/fake-navigation.wrapper";
import { FakeSignalWrapper } from "../../signal/fake-signal.wrapper";
import { FakeStorageWrapper } from "../../storage/fake-storage.wrapper";
import { SPLIT_ROOMS_KEY } from "../../storage/storage.key";
import { FakeRoomAdapter } from "../adapters/fake-room.adapter";
import { NewExpenseDomainModel } from "../models/room.domain.model";
import { ExpenseViewModel, PayerViewModel, PaymentViewModel, RoomViewModel } from "../models/room.view.model";
import { RoomController } from "../room.controller";
import { RoomPresenter } from "../room.presenter";
import { RoomService } from "../room.service";
import { RoomView } from "../room.view";

describe('Room', () => {
    let roomController: RoomController;
    let roomService: RoomService;
    let roomPresenter: RoomPresenter;
    let fakeRoomAdapter: FakeRoomAdapter;
    let fakeStorageWrapper: FakeStorageWrapper;
    let roomView: RoomView;
    let fakeNavigationWrapper: FakeNavigationWrapper;
    let fakeDialog: FakeDialog;

    const roomId = 'fake-room-id';
    const payerName = 'fake-payer-name';
    const expenseDescription = 'fake-expense-description';
    const expenseAmount = '123.459';
    const payerId = 'fake-payer-id';

    beforeEach(() => {
        fakeNavigationWrapper = new FakeNavigationWrapper();
        fakeNavigationWrapper.params = { roomId: roomId };
        roomView = new RoomView(new FakeSignalWrapper<RoomViewModel>(), fakeNavigationWrapper);
        fakeStorageWrapper = new FakeStorageWrapper();
        fakeRoomAdapter = new FakeRoomAdapter();
        roomPresenter = new RoomPresenter(roomView);
        roomService = new RoomService(roomPresenter, fakeRoomAdapter, fakeStorageWrapper);
        roomController = new RoomController(roomService, fakeNavigationWrapper);
        fakeDialog = new FakeDialog();
    });

    describe('fetch room', () => {
        it('should display loading', async () => {
            expect(roomView.roomViewModel.get().isLoadingFetchRoom).toEqual(false);

            const fetchRoomPromise = roomController.fetchRoom();

            expect(roomView.roomViewModel.get().isLoadingFetchRoom).toEqual(true);

            await fetchRoomPromise;

            expect(roomView.roomViewModel.get().isLoadingFetchRoom).toEqual(false);
        });

        it('should display loading on error', async () => {
            expect(roomView.roomViewModel.get().isLoadingFetchRoom).toEqual(false);

            fakeRoomAdapter.error = new Error();

            const fetchRoomPromise = roomController.fetchRoom();

            expect(roomView.roomViewModel.get().isLoadingFetchRoom).toEqual(true);

            await fetchRoomPromise;

            expect(roomView.roomViewModel.get().isLoadingFetchRoom).toEqual(false);
        });

        it('should use the current room id', async () => {
            expect(fakeRoomAdapter.roomId).toBeUndefined();

            await roomController.fetchRoom();

            expect(fakeRoomAdapter.roomId).toEqual(roomId);
        })

        it('should display error', async () => {
            expect(roomView.roomViewModel.get().isErrorFetchRoom).toEqual(false);

            fakeRoomAdapter.error = new Error();

            await roomController.fetchRoom();

            expect(roomView.roomViewModel.get().isErrorFetchRoom).toEqual(true);
        });

        it('should display room', async () => {
            expect(roomView.roomViewModel.get().roomId).toEqual('');
            expect(roomView.roomViewModel.get().roomName).toEqual('');
            expect(roomView.roomViewModel.get().payers).toEqual([]);
            expect(roomView.roomViewModel.get().expensesTotal).toEqual('');
            expect(roomView.roomViewModel.get().expensesAverage).toEqual('');
            expect(roomView.roomViewModel.get().payments).toEqual([]);

            const expectedRoom = createExpectedRoom(fakeRoomAdapter);

            await roomController.fetchRoom();

            expect(roomView.roomViewModel.get().roomId).toEqual(expectedRoom.roomId);
            expect(roomView.roomViewModel.get().roomName).toEqual(expectedRoom.roomName);
            expect(roomView.roomViewModel.get().payers).toEqual(expectedRoom.payers);
            expect(roomView.roomViewModel.get().expensesTotal).toEqual(expectedRoom.expensesTotal);
            expect(roomView.roomViewModel.get().expensesAverage).toEqual(expectedRoom.expensesAverage);
            expect(roomView.roomViewModel.get().payments).toEqual(expectedRoom.payments);
        });

        it('should add room to visited rooms in storage', async () => {
            const visitedRooms = [{ id: 'other-room-id', name: 'Other Room' }, { id: 'other-room-2-id', name: 'Other Room 2' }];
            fakeStorageWrapper.storage.set(SPLIT_ROOMS_KEY, visitedRooms);

            expect(fakeStorageWrapper.storage.get(SPLIT_ROOMS_KEY)).toEqual(visitedRooms);

            await roomController.fetchRoom();

            expect(fakeStorageWrapper.storage.get(SPLIT_ROOMS_KEY)).toEqual([
                ...visitedRooms,
                { id: fakeRoomAdapter.room.id, name: fakeRoomAdapter.room.name }
            ]);
        });

        it('should initialize visited rooms in storage if not exist', async () => {
            expect(fakeStorageWrapper.storage.get(SPLIT_ROOMS_KEY)).toBeUndefined();

            await roomController.fetchRoom();

            expect(fakeStorageWrapper.storage.get(SPLIT_ROOMS_KEY)).toEqual([{ id: fakeRoomAdapter.room.id, name: fakeRoomAdapter.room.name }]);
        });

        it('should not add room to visited rooms in storage if already exist', async () => {
            const visitedRooms = [{ id: fakeRoomAdapter.room.id, name: fakeRoomAdapter.room.name }];
            fakeStorageWrapper.storage.set(SPLIT_ROOMS_KEY, visitedRooms);

            expect(fakeStorageWrapper.storage.get(SPLIT_ROOMS_KEY)).toEqual(visitedRooms);

            await roomController.fetchRoom();

            expect(fakeStorageWrapper.storage.get(SPLIT_ROOMS_KEY)).toEqual(visitedRooms);
        });
    });

    describe('add payer', () => {
        it('should display loading', async () => {
            expect(roomView.roomViewModel.get().isLoadingAddPayer).toEqual(false);

            const addPayerPromise = roomController.addPayer(payerName);

            expect(roomView.roomViewModel.get().isLoadingAddPayer).toEqual(true);

            await addPayerPromise;

            expect(roomView.roomViewModel.get().isLoadingAddPayer).toEqual(false);
        });

        it('should display loading on error', async () => {
            expect(roomView.roomViewModel.get().isLoadingAddPayer).toEqual(false);

            fakeRoomAdapter.error = new Error();

            const addPayerPromise = roomController.addPayer(payerName);

            expect(roomView.roomViewModel.get().isLoadingAddPayer).toEqual(true);

            await addPayerPromise;

            expect(roomView.roomViewModel.get().isLoadingAddPayer).toEqual(false);
        });

        it('should use the given name', async () => {
            expect(fakeRoomAdapter.payerName).toBeUndefined();

            await roomController.addPayer(payerName);

            expect(fakeRoomAdapter.payerName).toEqual(payerName);
        });

        it('should use the current room id', async () => {
            expect(fakeRoomAdapter.roomId).toBeUndefined();

            await roomController.addPayer(payerName);

            expect(fakeRoomAdapter.roomId).toEqual(roomId);
        });

        it('should display error', async () => {
            expect(roomView.roomViewModel.get().isErrorAddPayer).toEqual(false);

            fakeRoomAdapter.error = new Error();

            await roomController.addPayer(payerName);

            expect(roomView.roomViewModel.get().isErrorAddPayer).toEqual(true);
        });

        it('should display added payer', async () => {
            expect(roomView.roomViewModel.get().payers).toEqual([]);

            const expectedPayer = Builder<PayerViewModel>()
                .id(fakeRoomAdapter.payerId)
                .name(payerName)
                .expensesCount(0)
                .expensesTotal('0.00')
                .expenses([])
                .isErrorEditPayerName(false)
                .isLoadingEditPayerName(false)
                .isErrorDeletePayer(false)
                .isLoadingDeletePayer(false)
                .build();

            await roomController.addPayer(payerName);

            expect(roomView.roomViewModel.get().payers).toEqual([expectedPayer])
        });

        it('should reset error add payer on success', async () => {
            roomPresenter.presentErrorAddPayer();

            expect(roomView.roomViewModel.get().isErrorAddPayer).toEqual(true);

            await roomController.addPayer(payerName);

            expect(roomView.roomViewModel.get().isErrorAddPayer).toEqual(false);
        });
    })

    describe('add expense', () => {
        it('should display loading', async () => {
            expect(roomView.roomViewModel.get().isLoadingAddExpense).toEqual(false);

            const addExpensePromise = roomController.addExpense(expenseDescription, expenseAmount, payerId);

            expect(roomView.roomViewModel.get().isLoadingAddExpense).toEqual(true);

            await addExpensePromise;

            expect(roomView.roomViewModel.get().isLoadingAddExpense).toEqual(false);
        });

        it('should display loading on error', async () => {
            expect(roomView.roomViewModel.get().isLoadingAddExpense).toEqual(false);

            fakeRoomAdapter.error = new Error();

            const addExpensePromise = roomController.addExpense(expenseDescription, expenseAmount, payerId);

            expect(roomView.roomViewModel.get().isLoadingAddExpense).toEqual(true);

            await addExpensePromise;

            expect(roomView.roomViewModel.get().isLoadingAddExpense).toEqual(false);
        });

        it('should use the given expense data', async () => {
            expect(fakeRoomAdapter.newExpense).toBeUndefined();

            await roomController.addExpense(expenseDescription, expenseAmount, payerId);

            expect(fakeRoomAdapter.newExpense).toEqual(new NewExpenseDomainModel(
                expenseDescription,
                123.46,
                payerId,
            ));
        });

        it('should display error', async () => {
            expect(roomView.roomViewModel.get().isErrorAddExpense).toEqual(false);

            fakeRoomAdapter.error = new Error();

            await roomController.addExpense(expenseDescription, expenseAmount, payerId);

            expect(roomView.roomViewModel.get().isErrorAddExpense).toEqual(true);
        });

        it('should display added expense', async () => {
            await roomController.addPayer(payerName);

            expect(roomView.roomViewModel.get().payers[0].expenses).toEqual([]);

            const expectedExpense = Builder<ExpenseViewModel>()
                .id(fakeRoomAdapter.expenseId)
                .description(expenseDescription)
                .amount('123.46')
                .isErrorDeleteExpense(false)
                .isLoadingDeleteExpense(false)
                .build();

            await roomController.addExpense(expenseDescription, expenseAmount, payerId);

            expect(roomView.roomViewModel.get().payers[0].expenses).toEqual([expectedExpense])
        });

        it('should reset error add expense on success', async () => {
            roomPresenter.presentErrorAddExpense();

            expect(roomView.roomViewModel.get().isErrorAddExpense).toEqual(true);

            await roomController.addExpense(expenseDescription, expenseAmount, payerId);

            expect(roomView.roomViewModel.get().isErrorAddExpense).toEqual(false);
        });
    });

    describe('delete expense', () => {
        let expenseId: string;

        beforeEach(async () => {
            await roomController.addPayer(payerName);
            await roomController.addExpense(expenseDescription, expenseAmount, payerId);
            expenseId = roomView.roomViewModel.get().payers[0].expenses[0].id;
        });

        it('should display loading', async () => {
            expect(roomView.roomViewModel.get().payers[0].expenses[0].isLoadingDeleteExpense).toEqual(false);

            const deleteExpensePromise = roomController.validateDeleteExpense(expenseId, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0].expenses[0].isLoadingDeleteExpense).toEqual(true);

            await deleteExpensePromise;

            expect(roomView.roomViewModel.get().payers[0].expenses[0]).toBeUndefined();
        });

        it('should display loading on error', async () => {
            expect(roomView.roomViewModel.get().payers[0].expenses[0].isLoadingDeleteExpense).toEqual(false);

            fakeRoomAdapter.error = new Error();

            const deleteExpensePromise = roomController.validateDeleteExpense(expenseId, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0].expenses[0].isLoadingDeleteExpense).toEqual(true);

            await deleteExpensePromise;

            expect(roomView.roomViewModel.get().payers[0].expenses[0].isLoadingDeleteExpense).toEqual(false);
        });

        it('should close dialog', async () => {
            expect(fakeDialog.isClose).toEqual(false);

            await roomController.validateDeleteExpense(expenseId, fakeDialog);

            expect(fakeDialog.isClose).toEqual(true);
        });

        it('should display error', async () => {
            expect(roomView.roomViewModel.get().payers[0].expenses[0].isErrorDeleteExpense).toEqual(false);

            fakeRoomAdapter.error = new Error();

            await roomController.validateDeleteExpense(expenseId, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0].expenses[0].isErrorDeleteExpense).toEqual(true);
        });

        it('should delete expense', async () => {
            expect(roomView.roomViewModel.get().payers[0].expenses[0].id).toEqual(expenseId);

            await roomController.validateDeleteExpense(expenseId, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0].expenses[0]).toBeUndefined();
        });
    });

    describe('delete all expenses', () => {
        beforeEach(async () => {
            await roomController.fetchRoom();
        });

        it('should display loading', async () => {
            expect(roomView.roomViewModel.get().isLoadingDeleteAllExpenses).toEqual(false);

            const deleteAllExpensesPromise = roomController.validateDeleteAllExpenses(fakeDialog);

            expect(roomView.roomViewModel.get().isLoadingDeleteAllExpenses).toEqual(true);

            await deleteAllExpensesPromise;

            expect(roomView.roomViewModel.get().isLoadingDeleteAllExpenses).toEqual(false);
        });

        it('should display loading on error', async () => {
            expect(roomView.roomViewModel.get().isLoadingDeleteAllExpenses).toEqual(false);

            fakeRoomAdapter.error = new Error();

            const deleteAllExpensesPromise = roomController.validateDeleteAllExpenses(fakeDialog);

            expect(roomView.roomViewModel.get().isLoadingDeleteAllExpenses).toEqual(true);

            await deleteAllExpensesPromise;

            expect(roomView.roomViewModel.get().isLoadingDeleteAllExpenses).toEqual(false);
        });

        it('should close dialog', async () => {
            expect(fakeDialog.isClose).toEqual(false);

            await roomController.validateDeleteAllExpenses(fakeDialog);

            expect(fakeDialog.isClose).toEqual(true);
        });

        it('should display error', async () => {
            expect(roomView.roomViewModel.get().isErrorDeleteAllExpenses).toEqual(false);

            fakeRoomAdapter.error = new Error();

            await roomController.validateDeleteAllExpenses(fakeDialog);

            expect(roomView.roomViewModel.get().isErrorDeleteAllExpenses).toEqual(true);
        });

        it('should delete all expenses', async () => {
            expect(roomView.roomViewModel.get().payers.flatMap(payer => payer.expenses).length).toEqual(9);

            await roomController.validateDeleteAllExpenses(fakeDialog);

            expect(roomView.roomViewModel.get().payers.flatMap(payer => payer.expenses).length).toEqual(0);
        });

        it('should reset error delete all expenses on success', async () => {
            roomPresenter.presentErrorDeleteAllExpenses();

            expect(roomView.roomViewModel.get().isErrorDeleteAllExpenses).toEqual(true);

            await roomController.validateDeleteAllExpenses(fakeDialog);

            expect(roomView.roomViewModel.get().isErrorDeleteAllExpenses).toEqual(false);
        });
    });

    describe('share url', () => {
        const roomName = 'fake-room-name';

        it('should share room url', () => {
            expect(fakeNavigationWrapper.shareData).toBeUndefined();

            roomController.shareUrl(roomName);

            expect(fakeNavigationWrapper.shareData).toEqual({
                text: `Rejoignez ma salle de partage de dépenses : ${roomName} !\n`,
                url: location.href
            });
        });
    });

    describe('edit room name', () => {
        const newRoomName = 'new-fake-room-name';

        it('should display loading', async () => {
            expect(roomView.roomViewModel.get().isLoadingEditRoomName).toEqual(false);

            const editRoomPromise = roomController.validateEditRoomName(newRoomName, fakeDialog);

            expect(roomView.roomViewModel.get().isLoadingEditRoomName).toEqual(true);

            await editRoomPromise;

            expect(roomView.roomViewModel.get().isLoadingEditRoomName).toEqual(false);
        });

        it('should display loading on error', async () => {
            expect(roomView.roomViewModel.get().isLoadingEditRoomName).toEqual(false);

            fakeRoomAdapter.error = new Error();

            const editRoomPromise = roomController.validateEditRoomName(newRoomName, fakeDialog);

            expect(roomView.roomViewModel.get().isLoadingEditRoomName).toEqual(true);

            await editRoomPromise;

            expect(roomView.roomViewModel.get().isLoadingEditRoomName).toEqual(false);
        });

        it('should use the given name', async () => {
            expect(fakeRoomAdapter.newRoomName).toBeUndefined()

            await roomController.validateEditRoomName(newRoomName, fakeDialog);

            expect(fakeRoomAdapter.newRoomName).toEqual(newRoomName);
        });

        it('should display error', async () => {
            expect(roomView.roomViewModel.get().isErrorEditRoomName).toEqual(false);

            fakeRoomAdapter.error = new Error();

            await roomController.validateEditRoomName(newRoomName, fakeDialog);

            expect(roomView.roomViewModel.get().isErrorEditRoomName).toEqual(true);
        });

        it('should display updated room name', async () => {
            expect(roomView.roomViewModel.get().roomName).toEqual('');

            await roomController.validateEditRoomName(newRoomName, fakeDialog);

            expect(roomView.roomViewModel.get().roomName).toEqual(newRoomName);
        });

        it('should reset error edit room name on success', async () => {
            roomPresenter.presentErrorEditRoomName();

            expect(roomView.roomViewModel.get().isErrorEditRoomName).toEqual(true);

            await roomController.validateEditRoomName(newRoomName, fakeDialog);

            expect(roomView.roomViewModel.get().isErrorEditRoomName).toEqual(false);
        });
    });

    describe('edit payer name', () => {
        const newPayerName = 'new-fake-payer-name';

        beforeEach(async () => {
            await roomController.addPayer(payerName);
        });

        it('should display loading', async () => {
            expect(roomView.roomViewModel.get().payers[0].isLoadingEditPayerName).toEqual(false);

            const editPayerPromise = roomController.validateEditPayerName(payerId, newPayerName, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0].isLoadingEditPayerName).toEqual(true);

            await editPayerPromise;

            expect(roomView.roomViewModel.get().payers[0].isLoadingEditPayerName).toEqual(false);
        });

        it('should display loading on error', async () => {
            expect(roomView.roomViewModel.get().payers[0].isLoadingEditPayerName).toEqual(false);

            fakeRoomAdapter.error = new Error();

            const editPayerPromise = roomController.validateEditPayerName(payerId, newPayerName, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0].isLoadingEditPayerName).toEqual(true);

            await editPayerPromise;

            expect(roomView.roomViewModel.get().payers[0].isLoadingEditPayerName).toEqual(false);
        });

        it('should use the given name', async () => {
            expect(fakeRoomAdapter.newPayerName).toBeUndefined()

            await roomController.validateEditPayerName(payerId, newPayerName, fakeDialog);

            expect(fakeRoomAdapter.newPayerName).toEqual(newPayerName);
        });

        it('should display error', async () => {
            expect(roomView.roomViewModel.get().payers[0].isErrorEditPayerName).toEqual(false);

            fakeRoomAdapter.error = new Error();

            await roomController.validateEditPayerName(payerId, newPayerName, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0].isErrorEditPayerName).toEqual(true);
        });

        it('should display updated payer name', async () => {
            expect(roomView.roomViewModel.get().payers[0].name).toEqual(payerName);

            await roomController.validateEditPayerName(payerId, newPayerName, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0].name).toEqual(newPayerName);
        });

        it('should reset error edit payer name on success', async () => {
            roomPresenter.presentErrorEditPayerName(payerId);

            expect(roomView.roomViewModel.get().payers[0].isErrorEditPayerName).toEqual(true);

            await roomController.validateEditPayerName(payerId, newPayerName, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0].isErrorEditPayerName).toEqual(false);
        });
    });

    describe('delete payer', () => {
        beforeEach(async () => {
            await roomController.addPayer(payerName);
        });

        it('should display loading', async () => {
            expect(roomView.roomViewModel.get().payers[0].isLoadingDeletePayer).toEqual(false);

            const deletePayerPromise = roomController.validateDeletePayer(payerId, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0].isLoadingDeletePayer).toEqual(true);

            await deletePayerPromise;

            expect(roomView.roomViewModel.get().payers[0]).toBeUndefined();
        });

        it('should display loading on error', async () => {
            expect(roomView.roomViewModel.get().payers[0].isLoadingDeletePayer).toEqual(false);

            fakeRoomAdapter.error = new Error();

            const deletePayerPromise = roomController.validateDeletePayer(payerId, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0].isLoadingDeletePayer).toEqual(true);

            await deletePayerPromise;

            expect(roomView.roomViewModel.get().payers[0].isLoadingDeletePayer).toEqual(false);
        });

        it('should close dialog', async () => {
            expect(fakeDialog.isClose).toEqual(false);

            await roomController.validateDeletePayer(payerId, fakeDialog);

            expect(fakeDialog.isClose).toEqual(true);
        });

        it('should display error', async () => {
            expect(roomView.roomViewModel.get().payers[0].isErrorDeletePayer).toEqual(false);

            fakeRoomAdapter.error = new Error();

            await roomController.validateDeletePayer(payerId, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0].isErrorDeletePayer).toEqual(true);
        });

        it('should delete payer', async () => {
            expect(roomView.roomViewModel.get().payers[0].id).toEqual(payerId);

            await roomController.validateDeletePayer(payerId, fakeDialog);

            expect(roomView.roomViewModel.get().payers[0]).toBeUndefined();
        });
    });

    describe('delete room', () => {
        beforeEach(async () => {
            await roomController.fetchRoom();
        });

        it('should display loading', async () => {
            expect(roomView.roomViewModel.get().isLoadingDeleteRoom).toEqual(false);

            const deleteRoomPromise = roomController.validateDeleteRoom(fakeDialog);

            expect(roomView.roomViewModel.get().isLoadingDeleteRoom).toEqual(true);

            await deleteRoomPromise;

            expect(roomView.roomViewModel.get().isLoadingDeleteRoom).toEqual(false);
        });

        it('should display loading on error', async () => {
            expect(roomView.roomViewModel.get().isLoadingDeleteRoom).toEqual(false);

            fakeRoomAdapter.error = new Error();

            const deleteRoomPromise = roomController.validateDeleteRoom(fakeDialog);

            expect(roomView.roomViewModel.get().isLoadingDeleteRoom).toEqual(true);

            await deleteRoomPromise;

            expect(roomView.roomViewModel.get().isLoadingDeleteRoom).toEqual(false);
        });

        it('should close dialog', async () => {
            expect(fakeDialog.isClose).toEqual(false);

            await roomController.validateDeleteRoom(fakeDialog);

            expect(fakeDialog.isClose).toEqual(true);
        });

        it('should display error', async () => {
            expect(roomView.roomViewModel.get().isErrorDeleteRoom).toEqual(false);

            fakeRoomAdapter.error = new Error();

            await roomController.validateDeleteRoom(fakeDialog);

            expect(roomView.roomViewModel.get().isErrorDeleteRoom).toEqual(true);
        });

        it('should navigate to home page', async () => {
            expect(fakeNavigationWrapper.commands).toEqual([]);

            await roomController.validateDeleteRoom(fakeDialog);

            expect(fakeNavigationWrapper.commands).toEqual([AppPath.Home]);
        });

        it('should forget room from visited rooms in storage', async () => {
            const visitedRooms = [{ id: 'other-room-id', name: 'Other Room' }, { id: roomId, name: 'Fake Room' }];
            fakeStorageWrapper.storage.set(SPLIT_ROOMS_KEY, visitedRooms);

            expect(fakeStorageWrapper.storage.get(SPLIT_ROOMS_KEY)).toEqual(visitedRooms);

            await roomController.validateDeleteRoom(fakeDialog);

            expect(fakeStorageWrapper.storage.get(SPLIT_ROOMS_KEY)).toEqual([{ id: 'other-room-id', name: 'Other Room' }]);
        })
    });

    describe('fetch room history', () => {
        it('should display loading', async () => {
            expect(roomView.roomViewModel.get().roomHistory.isLoadingFetchRoomHistory).toEqual(false);

            const fetchRoomHistoryPromise = roomController.fetchRoomHistory();

            expect(roomView.roomViewModel.get().roomHistory.isLoadingFetchRoomHistory).toEqual(true);

            await fetchRoomHistoryPromise;

            expect(roomView.roomViewModel.get().roomHistory.isLoadingFetchRoomHistory).toEqual(false);
        });

        it('should display loading on error', async () => {
            expect(roomView.roomViewModel.get().roomHistory.isLoadingFetchRoomHistory).toEqual(false);

            fakeRoomAdapter.error = new Error();

            const fetchRoomHistoryPromise = roomController.fetchRoomHistory();

            expect(roomView.roomViewModel.get().roomHistory.isLoadingFetchRoomHistory).toEqual(true);

            await fetchRoomHistoryPromise;

            expect(roomView.roomViewModel.get().roomHistory.isLoadingFetchRoomHistory).toEqual(false);
        });

        it('should use the current room id', async () => {
            expect(fakeRoomAdapter.roomIdHistory).toBeUndefined();

            await roomController.fetchRoomHistory();

            expect(fakeRoomAdapter.roomIdHistory).toEqual(roomId);
        });

        it('should display error', async () => {
            expect(roomView.roomViewModel.get().roomHistory.isErrorFetchRoomHistory).toEqual(false);

            fakeRoomAdapter.error = new Error();

            await roomController.fetchRoomHistory();

            expect(roomView.roomViewModel.get().roomHistory.isErrorFetchRoomHistory).toEqual(true);
        });

        it('should display room history', async () => {
            expect(roomView.roomViewModel.get().roomHistory.payers).toEqual([]);

            const expectedRoomHistory = createExpectedRoom(fakeRoomAdapter);

            await roomController.fetchRoomHistory();

            expect(roomView.roomViewModel.get().roomHistory.payers).toEqual(expectedRoomHistory.payers);
        });
    });

    function createExpectedRoom(fakeRoomAdapter: FakeRoomAdapter) {
        return Builder<RoomViewModel>()
            .roomId(fakeRoomAdapter.room.id)
            .roomName(fakeRoomAdapter.room.name)
            .payers([
                Builder<PayerViewModel>()
                    .id('1')
                    .name('Alice')
                    .expensesCount(3)
                    .expensesTotal('100.00')
                    .isErrorEditPayerName(false)
                    .isLoadingEditPayerName(false)
                    .isErrorDeletePayer(false)
                    .isLoadingDeletePayer(false)
                    .expenses([
                        Builder<ExpenseViewModel>()
                            .id('a')
                            .description('Hotel')
                            .amount('50.00')
                            .isErrorDeleteExpense(false)
                            .isLoadingDeleteExpense(false)
                            .build(),
                        Builder<ExpenseViewModel>()
                            .id('b')
                            .description('Restaurant')
                            .amount('30.00')
                            .isErrorDeleteExpense(false)
                            .isLoadingDeleteExpense(false)
                            .build(),
                        Builder<ExpenseViewModel>()
                            .id('c')
                            .description('Museum')
                            .amount('20.00')
                            .isErrorDeleteExpense(false)
                            .isLoadingDeleteExpense(false)
                            .build()
                    ])
                    .build(),
                Builder<PayerViewModel>()
                    .id('2')
                    .name('Bob')
                    .expensesCount(3)
                    .expensesTotal('135.00')
                    .isErrorEditPayerName(false)
                    .isLoadingEditPayerName(false)
                    .isErrorDeletePayer(false)
                    .isLoadingDeletePayer(false)
                    .expenses([
                        Builder<ExpenseViewModel>()
                            .id('d')
                            .description('Flight')
                            .amount('80.00')
                            .isErrorDeleteExpense(false)
                            .isLoadingDeleteExpense(false)
                            .build(),
                        Builder<ExpenseViewModel>()
                            .id('e')
                            .description('Car Rental')
                            .amount('40.00')
                            .isErrorDeleteExpense(false)
                            .isLoadingDeleteExpense(false)
                            .build(),
                        Builder<ExpenseViewModel>()
                            .id('f')
                            .description('Snacks')
                            .amount('15.00')
                            .isErrorDeleteExpense(false)
                            .isLoadingDeleteExpense(false)
                            .build(),
                    ])
                    .build(),
                Builder<PayerViewModel>()
                    .id('3')
                    .name('Charlie')
                    .expensesCount(3)
                    .expensesTotal('95.00')
                    .isErrorEditPayerName(false)
                    .isLoadingEditPayerName(false)
                    .isErrorDeletePayer(false)
                    .isLoadingDeletePayer(false)
                    .expenses([
                        Builder<ExpenseViewModel>()
                            .id('g')
                            .description('Accommodation')
                            .amount('60.00')
                            .isErrorDeleteExpense(false)
                            .isLoadingDeleteExpense(false)
                            .build(),
                        Builder<ExpenseViewModel>()
                            .id('h')
                            .description('Activities')
                            .amount('20.00')
                            .isErrorDeleteExpense(false)
                            .isLoadingDeleteExpense(false)
                            .build(),
                        Builder<ExpenseViewModel>()
                            .id('i')
                            .description('Souvenirs')
                            .amount('15.00')
                            .isErrorDeleteExpense(false)
                            .isLoadingDeleteExpense(false)
                            .build()
                    ])
                    .build(),
            ])
            .expensesTotal('330.00')
            .expensesAverage('110.00')
            .payments([
                Builder<PaymentViewModel>()
                    .fromPayerName('Alice')
                    .toPayerName('Bob')
                    .amount('10.00')
                    .build(),
                Builder<PaymentViewModel>()
                    .fromPayerName('Charlie')
                    .toPayerName('Bob')
                    .amount('15.00')
                    .build(),
            ])
            .build();
    }

    describe('create room', () => {
        const roomName = 'fake-room-name';

        it('should display loading', async () => {
            expect(roomView.roomViewModel.get().isCreateRoomLoading).toEqual(false);

            const createRoomPromise = roomController.createRoom(roomName);

            expect(roomView.roomViewModel.get().isCreateRoomLoading).toEqual(true);

            await createRoomPromise;

            expect(roomView.roomViewModel.get().isCreateRoomLoading).toEqual(false);
        });

        it('should display loading on error', async () => {
            expect(roomView.roomViewModel.get().isCreateRoomLoading).toEqual(false);

            fakeRoomAdapter.error = new Error();

            const createRoomPromise = roomController.createRoom(roomName);

            expect(roomView.roomViewModel.get().isCreateRoomLoading).toEqual(true);

            await createRoomPromise;

            expect(roomView.roomViewModel.get().isCreateRoomLoading).toEqual(false);
        });

        it('should use the given name', async () => {
            expect(fakeRoomAdapter.createdRoomName).toBeUndefined();

            await roomController.createRoom(roomName);

            expect(fakeRoomAdapter.createdRoomName).toEqual(roomName);
        });

        it('should navigate to the created room', async () => {
            expect(fakeNavigationWrapper.commands).toEqual([]);

            await roomController.createRoom(roomName);

            expect(fakeNavigationWrapper.commands).toEqual([AppPath.Rooms, fakeRoomAdapter.createdRoomId]);
        });

        it('should display error', async () => {
            expect(roomView.roomViewModel.get().isCreateRoomError).toEqual(false);

            fakeRoomAdapter.error = new Error();

            await roomController.createRoom(roomName);

            expect(roomView.roomViewModel.get().isCreateRoomError).toEqual(true);
        });
    });

    describe('load visited rooms', () => {
        it('should load visited rooms from storage', () => {
            expect(roomView.roomViewModel.get().visitedRooms).toEqual([]);

            const visitedRooms = [
                { id: 'room-1', name: 'Room 1' },
                { id: 'room-2', name: 'Room 2' }
            ];
            fakeStorageWrapper.storage.set(SPLIT_ROOMS_KEY, visitedRooms);

            roomController.loadVisitedRooms();

            expect(roomView.roomViewModel.get().visitedRooms).toEqual(visitedRooms);
        });

        it('should load empty visited rooms if there is no visited rooms in storage', () => {
            expect(roomView.roomViewModel.get().visitedRooms).toEqual([]);

            roomController.loadVisitedRooms();

            expect(roomView.roomViewModel.get().visitedRooms).toEqual([]);
        });
    });

    describe('select room', () => {
        it('should navigate to the selected room', () => {
            const selectedRoomId = 'fake-room-id';

            expect(fakeNavigationWrapper.commands).toEqual([]);

            roomController.selectRoom(selectedRoomId);

            expect(fakeNavigationWrapper.commands).toEqual([AppPath.Rooms, selectedRoomId]);
        });
    });

    describe('forget room', () => {
        const forgetRoomId = 'room-1';
        const visitedRooms = [
            { id: forgetRoomId, name: 'Room 1' },
            { id: 'room-2', name: 'Room 2' }
        ];

        beforeEach(() => {
            fakeStorageWrapper.storage.set(SPLIT_ROOMS_KEY, visitedRooms);
        });

        it('should forget the room from visited rooms in storage', () => {
            expect(fakeStorageWrapper.storage.get(SPLIT_ROOMS_KEY)).toEqual(visitedRooms);

            roomController.forgetRoom(forgetRoomId, fakeDialog);

            expect(fakeStorageWrapper.storage.get(SPLIT_ROOMS_KEY)).toEqual([{ id: 'room-2', name: 'Room 2' }]);
        });

        it('should update the view after forgetting the room', () => {
            roomController.loadVisitedRooms();

            expect(roomView.roomViewModel.get().visitedRooms).toEqual(visitedRooms);

            roomController.forgetRoom(forgetRoomId, fakeDialog);

            expect(roomView.roomViewModel.get().visitedRooms).toEqual([{ id: 'room-2', name: 'Room 2' }]);
        });

        it('should close the dialog', () => {
            expect(fakeDialog.isClose).toEqual(false);

            roomController.forgetRoom(forgetRoomId, fakeDialog);

            expect(fakeDialog.isClose).toEqual(true);
        });
    });
});
