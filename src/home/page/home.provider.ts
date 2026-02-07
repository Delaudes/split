import { InjectionToken } from "@angular/core";
import { HTTP_TOKEN } from "../../http/http.provider";
import { NavigationPort } from "../../navigation/navigation.port";
import { NAVIGATION_PROVIDERS, NAVIGATION_TOKEN } from "../../navigation/navigation.provider";
import { AngularSignalWrapper } from "../../signal/angular-signal.wrapper";
import { HttpHomeAdapter } from "../adapters/http-home.adapter";
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
        useClass: HttpHomeAdapter,
        deps: [HTTP_TOKEN]
    },
    {
        provide: HomeView,
        useFactory: (navigationPort: NavigationPort) => new HomeView(new AngularSignalWrapper<HomeViewModel>(), navigationPort),
        deps: [NAVIGATION_TOKEN],
    },
    ...NAVIGATION_PROVIDERS
]