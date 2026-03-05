import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { VisitedRoomViewModel } from '../../models/room.view.model';
import { RoomController } from '../../room.controller';
import { RoomView } from '../../room.view';
import { ForgetRoomComponent } from './forget-room.component';

@Component({
    selector: 'app-visited-rooms',
    imports: [ForgetRoomComponent],
    templateUrl: './visited-rooms.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisitedRoomsComponent implements OnInit {
    private readonly roomView = inject(RoomView);
    protected readonly roomController = inject(RoomController);

    get visitedRooms(): VisitedRoomViewModel[] {
        return this.roomView.roomViewModel.get().visitedRooms;
    }

    ngOnInit(): void {
        this.roomController.loadVisitedRooms();
    }
}
