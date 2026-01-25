import { AppPath } from "../../app/app.routes";
import { FakeNavigationAdapter } from "../../navigation/fake-navigation.adapter";
import { FakeSignalAdapter } from "../../signal/fake-signal.adapter";
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
    let homeView: HomeView;
    let fakeNavigationAdapter: FakeNavigationAdapter;

    beforeEach(() => {
        fakeNavigationAdapter = new FakeNavigationAdapter();
        homeView = new HomeView(new FakeSignalAdapter<HomeViewModel>(), fakeNavigationAdapter);
        fakeHomeAdapter = new FakeHomeAdapter();
        homePresenter = new HomePresenter(homeView);
        homeService = new HomeService(homePresenter, fakeHomeAdapter);
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

        it('should use the given name', async () => {
            expect(fakeHomeAdapter.roomName).toBeUndefined();

            await homeController.createRoom(roomName);

            expect(fakeHomeAdapter.roomName).toEqual(roomName);
        });

        it('should navigate to the created room', async () => {
            expect(fakeNavigationAdapter.commands).toEqual([]);

            await homeController.createRoom(roomName);

            expect(fakeNavigationAdapter.commands).toEqual([AppPath.Rooms, fakeHomeAdapter.roomId]);
        });

        it('should display error', async () => {
            expect(homeView.homeViewModel.get().isCreateRoomError).toEqual(false);

            fakeHomeAdapter.error = new Error();

            await homeController.createRoom(roomName);

            expect(homeView.homeViewModel.get().isCreateRoomError).toEqual(true);
        });
    })
});