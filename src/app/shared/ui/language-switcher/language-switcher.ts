import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LANGS } from '../../../core/i18n/i18n.config';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-language-switcher',
  imports: [TranslocoPipe],
  templateUrl: './language-switcher.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcher {
  protected readonly languageService = inject(LanguageService);
  protected readonly langs = LANGS;
}
