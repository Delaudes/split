import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PayerViewModel, RoomViewModel } from '../../models/room.view.model';
import { RoomController } from '../../room.controller';
import { RoomView } from '../../room.view';

@Component({
    selector: 'app-add-expense',
    imports: [],
    templateUrl: './add-expense.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseComponent {
    payer = input.required<PayerViewModel>();

    private readonly roomView = inject(RoomView);
    protected readonly roomController = inject(RoomController);

    get viewModel(): RoomViewModel {
        return this.roomView.roomViewModel.get();
    }
}
