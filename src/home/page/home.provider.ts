import { InjectionToken } from "@angular/core";
import { NavigationPort } from "../../navigation/navigation.port";
import { NAVIGATION_PROVIDERS, NAVIGATION_TOKEN } from "../../navigation/navigation.provider";
import { AngularSignalAdapter } from "../../signal/angular-signal.adapter";
import { InMemoryHomeAdapter } from "../adapters/in-memory-home.adapter";
import { HomeController } from "../home.controller";
import { HomePort } from "../home.port";
import { HomePresenter } from "../home.presenter";
import { HomeService } from "../home.service";
import { HomeView } from "../home.view";
import { HomeViewModel } from "../models/home.view.model";


export const HOME_TOKEN = new InjectionToken<HomePort>('HOME_TOKEN');

export const HOME_PROVIDERS = [
    {
        provide: HomeController,
        deps: [HomeService],
    },
    {
        provide: HomeService,
        deps: [HomePresenter, HOME_TOKEN],
    },
    {
        provide: HomePresenter,
        deps: [HomeView],
    },
    {
        provide: HOME_TOKEN,
        useClass: InMemoryHomeAdapter,
    },
    {
        provide: HomeView,
        useFactory: (navigationPort: NavigationPort) => new HomeView(new AngularSignalAdapter<HomeViewModel>(), navigationPort),
        deps: [NAVIGATION_TOKEN],
    },
    ...NAVIGATION_PROVIDERS
]