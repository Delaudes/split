import { InjectionToken } from "@angular/core";
import { NAVIGATION_PROVIDERS, NAVIGATION_TOKEN } from "../../navigation/navigation.provider";
import { AngularSignalAdapter } from "../../signal/angular-signal.adapter";
import { InMemoryRoomAdapter } from "../adapters/in-memory-room.adapter";
import { RoomPort } from "../home.port";
import { RoomViewModel } from "../models/room.view.model";
import { RoomController } from "../room.controller";
import { RoomPresenter } from "../room.presenter";
import { RoomService } from "../room.service";
import { RoomView } from "../room.view";

export const ROOM_TOKEN = new InjectionToken<RoomPort>('ROOM_TOKEN');

export const ROOM_PROVIDERS = [
    {
        provide: RoomController,
        deps: [RoomService, NAVIGATION_TOKEN],
    },
    {
        provide: RoomService,
        deps: [RoomPresenter, ROOM_TOKEN],
    },
    {
        provide: RoomPresenter,
        deps: [RoomView],
    },
    {
        provide: ROOM_TOKEN,
        useClass: InMemoryRoomAdapter,
    },
    {
        provide: RoomView,
        useFactory: () => new RoomView(new AngularSignalAdapter<RoomViewModel>()),
    },
    ...NAVIGATION_PROVIDERS
]