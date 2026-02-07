import { InjectionToken } from "@angular/core";
import { AngularHttpWrapper } from "./angular-http.wrapper";
import { HttpPort } from "./http.port";

export const HTTP_TOKEN = new InjectionToken<HttpPort>('HTTP_TOKEN');

export const HTTP_PROVIDERS = [
    {
        provide: HTTP_TOKEN,
        useClass: AngularHttpWrapper
    },
]
