import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RoomViewModel } from '../../models/room.view.model';
import { RoomController } from '../../room.controller';
import { RoomView } from '../../room.view';
import { PayerDeleteComponent } from './payer-delete.component';
import { RoomDeleteComponent } from './room-delete.component';

@Component({
    selector: 'app-room-settings',
    imports: [RoomDeleteComponent, PayerDeleteComponent],
    templateUrl: './room-settings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomSettingsComponent {
    private readonly roomView = inject(RoomView);
    protected readonly roomController = inject(RoomController);

    get viewModel(): RoomViewModel {
        return this.roomView.roomViewModel.get();
    }
}
