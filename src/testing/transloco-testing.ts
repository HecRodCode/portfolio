import { Injectable } from '@angular/core';
import { TranslocoLoader, provideTransloco } from '@jsverse/transloco';
import { of } from 'rxjs';

@Injectable()
class EmptyLoader implements TranslocoLoader {
  getTranslation() {
    return of({});
  }
}

/** Transloco for tests: no files are loaded, so templates render the translation keys. */
export const provideTestTransloco = () =>
  provideTransloco({
    config: { availableLangs: ['es', 'en'], defaultLang: 'es' },
    loader: EmptyLoader,
  });
