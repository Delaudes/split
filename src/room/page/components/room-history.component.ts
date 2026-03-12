import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RoomViewModel } from '../../models/room.view.model';
import { RoomController } from '../../room.controller';
import { RoomView } from '../../room.view';

@Component({
    selector: 'app-room-history',
    imports: [],
    templateUrl: './room-history.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomHistoryComponent {
    private readonly roomView = inject(RoomView);
    protected readonly roomController = inject(RoomController);

    get viewModel(): RoomViewModel {
        return this.roomView.roomViewModel.get();
    }

    openHistory(dialog: HTMLDialogElement): void {
        dialog.showModal();
        this.roomController.fetchRoomHistory();
    }
}
