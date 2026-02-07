import { InjectionToken } from "@angular/core";
import { AngularNavigationWrapper } from "./angular-navigation.wrapper";
import { NavigationPort } from "./navigation.port";

export const NAVIGATION_TOKEN = new InjectionToken<NavigationPort>('NAVIGATION_TOKEN');

export const NAVIGATION_PROVIDERS = [
    {
        provide: NAVIGATION_TOKEN,
        useClass: AngularNavigationWrapper
    },
]