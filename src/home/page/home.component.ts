import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateRoomFormComponent } from '../../room/page/components/create-room-form.component';
import { VisitedRoomsComponent } from '../../room/page/components/visited-rooms.component';

@Component({
  selector: 'app-home',
  imports: [VisitedRoomsComponent, CreateRoomFormComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly features = [
    {
      icon: 'lock_open',
      title: 'Sans compte',
      description: 'Aucune inscription requise'
    },
    {
      icon: 'group',
      title: 'Collaboratif',
      description: 'Partagez via un simple lien'
    },
    {
      icon: 'lightbulb',
      title: 'Minimaliste',
      description: "Seulement l'essentiel"
    }
  ];
}
