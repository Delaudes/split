import { AppPath } from "../app/app.routes";
import { NavigationPort } from "../navigation/navigation.port";

export class HomeController {
    constructor(
        private readonly navigationPort: NavigationPort
    ) { }

    navigateToHome(): void {
        this.navigationPort.navigate([AppPath.Home]);
    }
}
