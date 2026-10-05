import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LayoutStateService } from '../../core/layout/layout-state.service';
import { Icon } from '../../shared/ui/icon/icon';
import { SiteControls } from '../site-controls/site-controls';
import { SiteNav } from '../site-nav/site-nav';

/** Mobile top bar with a hamburger that opens a full-screen menu. */
@Component({
  selector: 'app-mobile-menu',
  imports: [TranslocoPipe, Icon, SiteNav, SiteControls],
  templateUrl: './mobile-menu.html',
  host: { '(document:keydown.escape)': 'close()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenu {
  protected readonly layout = inject(LayoutStateService);

  private readonly openButton = viewChild<ElementRef<HTMLButtonElement>>('openButton');
  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');
  private wasOpen = false;

  constructor() {
    // Move focus into the menu when it opens and back to the hamburger when it closes.
    effect(() => {
      const open = this.layout.menuOpen();
      queueMicrotask(() => {
        if (open) this.closeButton()?.nativeElement.focus();
        else if (this.wasOpen) this.openButton()?.nativeElement.focus();
        this.wasOpen = open;
      });
    });
  }

  protected close(): void {
    this.layout.closeMenu();
  }
}
