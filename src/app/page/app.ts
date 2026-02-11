import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppController } from '../app.controller';
import { APP_PROVIDERS } from '../app.provider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  providers: [APP_PROVIDERS],
})
export class App {
  protected readonly controller = inject(AppController);
}
