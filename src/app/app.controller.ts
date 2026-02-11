import { NavigationPort } from "../navigation/navigation.port";

export class AppController {
    private readonly GITHUB_REPO_URL = 'https://github.com/Delaudes/split';

    constructor(
        private readonly navigationPort: NavigationPort
    ) { }

    openIssue(): void {
        this.navigationPort.openExternal(`${this.GITHUB_REPO_URL}/issues/new`);
    }

    openSourceCode(): void {
        this.navigationPort.openExternal(this.GITHUB_REPO_URL);
    }
}
