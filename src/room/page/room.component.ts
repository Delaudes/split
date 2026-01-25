import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RoomViewModel } from '../models/room.view.model';
import { RoomController } from '../room.controller';
import { RoomView } from '../room.view';
import { ROOM_PROVIDERS } from './room.provider';

@Component({
  selector: 'app-room',
  imports: [],
  templateUrl: './room.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ROOM_PROVIDERS],
})
export class RoomComponent implements OnInit {
  private readonly roomView = inject(RoomView);
  protected readonly roomController = inject(RoomController);

  get viewModel(): RoomViewModel {
    return this.roomView.roomViewModel.get();
  }

  ngOnInit(): void {
    this.roomController.fetchRoom();
  }
}
