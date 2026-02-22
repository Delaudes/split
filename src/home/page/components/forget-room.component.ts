import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { HomeController } from '../../home.controller';
import { VisitedRoomViewModel } from '../../models/home.view.model';

@Component({
    selector: 'app-forget-room',
    imports: [],
    templateUrl: './forget-room.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgetRoomComponent {
    visitedRoom = input.required<VisitedRoomViewModel>();
    protected readonly homeController = inject(HomeController);
}
