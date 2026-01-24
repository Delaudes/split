import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';

export enum AppPath {
    Home = '',
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
