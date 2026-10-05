import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../core/i18n/language.service';
import { NAV_ITEMS, NavItem } from '../../core/layout/nav-items';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-site-nav',
  imports: [RouterLink, RouterLinkActive, TranslocoPipe, Icon],
  templateUrl: './site-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteNav {
  protected readonly lang = inject(LanguageService).current;
  protected readonly items = NAV_ITEMS;

  /** `/es` for home (no empty segment, or the link would never match the active URL), `/es/about` for the rest. */
  protected link(item: NavItem): string[] {
    return item.path ? ['/', this.lang(), item.path] : ['/', this.lang()];
  }

  /** Emitted after a link is activated (the mobile menu closes itself with it). */
  readonly navigated = output<void>();
}
