import { NAVIGATION_PROVIDERS, NAVIGATION_TOKEN } from "../navigation/navigation.provider";
import { AppController } from "./app.controller";

export const APP_PROVIDERS = [
    {
        provide: AppController,
        deps: [NAVIGATION_TOKEN],
    },
    ...NAVIGATION_PROVIDERS
];
