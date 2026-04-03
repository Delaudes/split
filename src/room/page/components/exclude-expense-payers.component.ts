import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ExpenseViewModel } from '../../models/room.view.model';
import { RoomController } from '../../room.controller';

@Component({
    selector: 'app-exclude-expense-payers',
    imports: [],
    templateUrl: './exclude-expense-payers.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExcludeExpensePayersComponent {
    expense = input.required<ExpenseViewModel>();
    protected readonly roomController = inject(RoomController);
}
