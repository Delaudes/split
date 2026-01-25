import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RoomViewModel } from '../models/room.view.model';
import { RoomController } from '../room.controller';
import { RoomView } from '../room.view';

@Component({
  selector: 'app-room',
  imports: [],
  templateUrl: './room.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent {
  private readonly roomView = inject(RoomView);
  protected readonly roomController = inject(RoomController);

  get viewModel(): RoomViewModel {
    return this.roomView.roomViewModel.get();
  }
}
