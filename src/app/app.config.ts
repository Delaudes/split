import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_PROVIDERS } from '../http/http.provider';
import { STORAGE_PROVIDERS } from '../storage/storage.provider';
import { APP_PROVIDERS } from './app.provider';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    HTTP_PROVIDERS,
    STORAGE_PROVIDERS,
    APP_PROVIDERS
  ]
};
