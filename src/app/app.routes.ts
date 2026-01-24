import { Routes } from '@angular/router';
import { HomeComponent } from '../home/page/home.component';
import { RoomComponent } from '../room/room.component';

export enum AppPath {
    Home = '',
    Rooms = 'rooms',
}

export enum AppParam {
    RoomId = 'roomId',
}

export const routes: Routes = [
    {
        path: AppPath.Home,
        component: HomeComponent,
    },
    {
        path: AppPath.Rooms + '/:' + AppParam.RoomId,
        component: RoomComponent,
    },
    {
        path: '**',
        redirectTo: AppPath.Home,
    }
];
