import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { filter } from 'rxjs';
import { LayoutStateService } from '../../core/layout/layout-state.service';
import { ExternalLinkDialog } from '../../shared/ui/external-link-dialog/external-link-dialog';
import { MobileMenu } from '../mobile-menu/mobile-menu';
import { Sidebar } from '../sidebar/sidebar';

/** Page frame for every `/:lang` route: sidebar (desktop), top bar (mobile) and the routed content. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, TranslocoPipe, Sidebar, MobileMenu, ExternalLinkDialog],
  templateUrl: './shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {
  protected readonly layout = inject(LayoutStateService);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    // After moving to another page, focus its heading so keyboard and screen reader users start at the
    // new content. Changing language, query or fragment keeps the page, so focus stays where it is.
    let previous: string | null = null;
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        const page = pageOf(event.urlAfterRedirects);
        if (previous !== null && page !== previous && this.isBrowser) this.focusContent();
        previous = page;
      });
  }

  /** `href="#main"` would resolve against `<base href>` and leave the page, so focus the content directly. */
  protected skipToContent(event: Event): void {
    event.preventDefault();
    this.document.getElementById('main')?.focus();
  }

  private focusContent(): void {
    const main = this.document.getElementById('main');
    const target = main?.querySelector<HTMLElement>('h1') ?? main;
    if (!target) return;
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
}

/** The route without its language prefix, query or fragment: `/es/about#stack` -> `about`. */
function pageOf(url: string): string {
  return url.split(/[?#]/)[0].split('/').filter(Boolean).slice(1).join('/');
}
