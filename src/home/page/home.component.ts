import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeController } from '../home.controller';
import { HomeView } from '../home.view';
import { HomeViewModel } from '../models/home.view.model';
import { HOME_PROVIDERS } from './home.provider';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HOME_PROVIDERS],
})
export class HomeComponent {
  private readonly homeView = inject(HomeView);
  protected readonly homeController = inject(HomeController);

  protected readonly features = [
    {
      icon: 'bolt',
      title: 'Instantané',
      description: 'Créez une salle en un clic'
    },
    {
      icon: 'group',
      title: 'Collaboratif',
      description: 'Partagez via un simple lien'
    },
    {
      icon: 'lock_open',
      title: 'Sans compte',
      description: 'Aucune inscription requise'
    }
  ];

  get viewModel(): HomeViewModel {
    return this.homeView.homeViewModel.get();
  }
}
