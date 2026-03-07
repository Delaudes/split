import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PayerViewModel } from '../../models/room.view.model';
import { RoomController } from '../../room.controller';

@Component({
    selector: 'app-payer-delete',
    imports: [],
    templateUrl: './payer-delete.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerDeleteComponent {
    payer = input.required<PayerViewModel>();
    protected readonly roomController = inject(RoomController);
}
