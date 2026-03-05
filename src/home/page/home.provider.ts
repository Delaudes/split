import { NAVIGATION_PROVIDERS, NAVIGATION_TOKEN } from "../../navigation/navigation.provider";
import { HomeController } from "../home.controller";

export const HOME_PROVIDERS = [
    {
        provide: HomeController,
        deps: [NAVIGATION_TOKEN],
    },
    ...NAVIGATION_PROVIDERS
]
