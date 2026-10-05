import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../core/i18n/language.service';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslocoPipe, Icon],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly lang = inject(LanguageService).current;
  protected readonly site = SITE;
  protected readonly photoSizes = '(min-width: 90rem) 30rem, (min-width: 64rem) 26rem, 18rem';
}
