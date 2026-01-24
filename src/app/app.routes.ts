import { Routes } from '@angular/router';
import { HomeComponent } from '../home/page/home.component';

export enum AppPath {
    Home = '',
    Rooms = 'rooms',
}

export const routes: Routes = [
    {
        path: AppPath.Home,
        component: HomeComponent,
    },
    {
        path: '**',
        redirectTo: AppPath.Home,
    }
];
