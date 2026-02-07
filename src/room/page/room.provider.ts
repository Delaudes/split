import { InjectionToken } from "@angular/core";
import { environment } from "../../environments/environment";
import { HTTP_TOKEN } from "../../http/http.provider";
import { NAVIGATION_PROVIDERS, NAVIGATION_TOKEN } from "../../navigation/navigation.provider";
import { AngularSignalWrapper } from "../../signal/angular-signal.wrapper";
import { HttpRoomAdapter } from "../adapters/http-room.adapter";
import { InMemoryRoomAdapter } from "../adapters/in-memory-room.adapter";
import { RoomViewModel } from "../models/room.view.model";
import { RoomController } from "../room.controller";
import { RoomPort } from "../room.port";
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
        useClass: environment.useInMemoryRoomAdapter ? InMemoryRoomAdapter : HttpRoomAdapter,
        deps: [HTTP_TOKEN]
    },
    {
        provide: RoomView,
        useFactory: () => new RoomView(new AngularSignalWrapper<RoomViewModel>()),
    },
    ...NAVIGATION_PROVIDERS
]