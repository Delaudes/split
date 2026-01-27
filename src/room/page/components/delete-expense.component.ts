import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ExpenseViewModel } from '../../models/room.view.model';
import { RoomController } from '../../room.controller';



@Component({
    selector: 'app-delete-expense',
    imports: [],
    templateUrl: './delete-expense.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteExpenseComponent {
    expense = input.required<ExpenseViewModel>();
    protected readonly roomController = inject(RoomController);
}
