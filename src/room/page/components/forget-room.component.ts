import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { VisitedRoomViewModel } from '../../models/room.view.model';
import { RoomController } from '../../room.controller';

@Component({
    selector: 'app-forget-room',
    imports: [],
    templateUrl: './forget-room.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgetRoomComponent {
    visitedRoom = input.required<VisitedRoomViewModel>();
    protected readonly roomController = inject(RoomController);
}
