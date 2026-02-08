import { InjectionToken } from "@angular/core";
import { LocalStorageWrapper } from "./local-storage.wrapper";
import { StoragePort } from "./storage.port";

export const STORAGE_TOKEN = new InjectionToken<StoragePort>('STORAGE_TOKEN');

export const STORAGE_PROVIDERS = [
    {
        provide: STORAGE_TOKEN,
        useClass: LocalStorageWrapper
    },
]
