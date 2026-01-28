import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RoomViewModel } from '../../models/room.view.model';
import { RoomController } from '../../room.controller';
import { RoomView } from '../../room.view';

@Component({
    selector: 'app-delete-all-expenses',
    imports: [],
    templateUrl: './delete-all-expenses.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAllExpensesComponent {
    private readonly roomView = inject(RoomView);
    protected readonly roomController = inject(RoomController);

    get viewModel(): RoomViewModel {
        return this.roomView.roomViewModel.get();
    }
}
