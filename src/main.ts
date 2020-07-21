import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { persistState, akitaConfig } from '@datorama/akita';

if (environment.production) {
  enableProdMode();
}

akitaConfig({ resettable: true });

persistState({ storage: localStorage });

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
