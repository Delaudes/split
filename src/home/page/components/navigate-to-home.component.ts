import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeController } from '../../home.controller';

@Component({
    selector: 'app-navigate-to-home',
    imports: [],
    templateUrl: './navigate-to-home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigateToHomeComponent {
    protected readonly homeController = inject(HomeController);
}
