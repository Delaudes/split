import { AppPath } from "../../app/app.routes";
import { FakeNavigationWrapper } from "../../navigation/fake-navigation.wrapper";
import { HomeController } from "../home.controller";

describe('Home', () => {
    let homeController: HomeController;
    let fakeNavigationWrapper: FakeNavigationWrapper;

    beforeEach(() => {
        fakeNavigationWrapper = new FakeNavigationWrapper();
        homeController = new HomeController(fakeNavigationWrapper);
    });

    describe('navigate to home', () => {
        it('should navigate to home page', () => {
            expect(fakeNavigationWrapper.commands).toEqual([]);

            homeController.navigateToHome();

            expect(fakeNavigationWrapper.commands).toEqual([AppPath.Home]);
        });
    });
});
