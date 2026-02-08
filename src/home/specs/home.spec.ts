import { AppPath } from "../../app/app.routes";
import { FakeNavigationWrapper } from "../../navigation/fake-navigation.wrapper";
import { FakeSignalWrapper } from "../../signal/fake-signal.wrapper";
import { FakeStorageWrapper } from "../../storage/fake-storage.wrapper";
import { SPLIT_ROOMS_KEY } from "../../storage/storage.key";
import { FakeHomeAdapter } from "../adapters/fake-home.adapter";
import { HomeController } from "../home.controller";
import { HomePresenter } from "../home.presenter";
import { HomeService } from "../home.service";
import { HomeView } from "../home.view";
import { HomeViewModel } from "../models/home.view.model";

describe('Home', () => {
    let homeController: HomeController;
    let homeService: HomeService;
    let homePresenter: HomePresenter;
    let fakeHomeAdapter: FakeHomeAdapter;
    let fakeStorageWrapper: FakeStorageWrapper;
    let homeView: HomeView;
    let fakeNavigationWrapper: FakeNavigationWrapper;

    beforeEach(() => {
        fakeNavigationWrapper = new FakeNavigationWrapper();
        homeView = new HomeView(new FakeSignalWrapper<HomeViewModel>(), fakeNavigationWrapper);
        fakeStorageWrapper = new FakeStorageWrapper();
        fakeHomeAdapter = new FakeHomeAdapter();
        homePresenter = new HomePresenter(homeView);
        homeService = new HomeService(homePresenter, fakeHomeAdapter, fakeStorageWrapper);
        homeController = new HomeController(homeService);
    });

    describe('create room', () => {
        const roomName = 'fake-room-name';

        it('should display loading', async () => {
            expect(homeView.homeViewModel.get().isCreateRoomLoading).toEqual(false);

            const createRoomPromise = homeController.createRoom(roomName);

            expect(homeView.homeViewModel.get().isCreateRoomLoading).toEqual(true);

            await createRoomPromise;

            expect(homeView.homeViewModel.get().isCreateRoomLoading).toEqual(false);
        });

        it('should display loading on error', async () => {
            expect(homeView.homeViewModel.get().isCreateRoomLoading).toEqual(false);

            fakeHomeAdapter.error = new Error();

            const createRoomPromise = homeController.createRoom(roomName);

            expect(homeView.homeViewModel.get().isCreateRoomLoading).toEqual(true);

            await createRoomPromise;

            expect(homeView.homeViewModel.get().isCreateRoomLoading).toEqual(false);
        });

        it('should use the given name', async () => {
            expect(fakeHomeAdapter.roomName).toBeUndefined();

            await homeController.createRoom(roomName);

            expect(fakeHomeAdapter.roomName).toEqual(roomName);
        });

        it('should navigate to the created room', async () => {
            expect(fakeNavigationWrapper.commands).toEqual([]);

            await homeController.createRoom(roomName);

            expect(fakeNavigationWrapper.commands).toEqual([AppPath.Rooms, fakeHomeAdapter.roomId]);
        });

        it('should display error', async () => {
            expect(homeView.homeViewModel.get().isCreateRoomError).toEqual(false);

            fakeHomeAdapter.error = new Error();

            await homeController.createRoom(roomName);

            expect(homeView.homeViewModel.get().isCreateRoomError).toEqual(true);
        });
    })

    describe('load visited rooms', () => {
        it('should load visited rooms from storage', async () => {
            expect(homeView.homeViewModel.get().visitedRooms).toEqual([]);

            const visitedRooms = [
                { id: 'room-1', name: 'Room 1' },
                { id: 'room-2', name: 'Room 2' }
            ];
            fakeStorageWrapper.storage.set(SPLIT_ROOMS_KEY, visitedRooms);

            homeController.loadVisitedRooms();

            expect(homeView.homeViewModel.get().visitedRooms).toEqual(visitedRooms);
        });

        it('should load empty visited rooms if there is no visited rooms in storage', async () => {
            expect(homeView.homeViewModel.get().visitedRooms).toEqual([]);

            homeController.loadVisitedRooms();

            expect(homeView.homeViewModel.get().visitedRooms).toEqual([]);
        });
    });
});