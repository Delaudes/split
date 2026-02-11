import { FakeNavigationWrapper } from "../../navigation/fake-navigation.wrapper";
import { AppController } from "../app.controller";

describe('App', () => {
    let appController: AppController;
    let fakeNavigationWrapper: FakeNavigationWrapper;

    const GITHUB_REPO_URL = 'https://github.com/Delaudes/split';

    beforeEach(() => {
        fakeNavigationWrapper = new FakeNavigationWrapper();
        appController = new AppController(fakeNavigationWrapper);
    });

    describe('openIssue', () => {
        it('should open GitHub Issues', () => {
            expect(fakeNavigationWrapper.externalUrl).toBeUndefined();

            appController.openIssue();

            expect(fakeNavigationWrapper.externalUrl).toEqual(`${GITHUB_REPO_URL}/issues/new`);
        });
    });

    describe('openSourceCode', () => {
        it('should open GitHub repository', () => {
            expect(fakeNavigationWrapper.externalUrl).toBeUndefined();

            appController.openSourceCode();

            expect(fakeNavigationWrapper.externalUrl).toEqual(GITHUB_REPO_URL);
        });
    });
});
