import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HOME_PROVIDERS } from '../home/page/home.provider';
import { HTTP_PROVIDERS } from '../http/http.provider';
import { ROOM_PROVIDERS } from '../room/page/room.provider';
import { STORAGE_PROVIDERS } from '../storage/storage.provider';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    HTTP_PROVIDERS,
    STORAGE_PROVIDERS,
    HOME_PROVIDERS,
    ROOM_PROVIDERS
  ]
};
