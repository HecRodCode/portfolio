import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LayoutStateService } from '../../core/layout/layout-state.service';
import { PaletteService } from '../../core/theme/palette.service';
import { Icon } from '../../shared/ui/icon/icon';
import { PalettePicker } from '../../shared/ui/palette-picker/palette-picker';
import { SiteControls } from '../site-controls/site-controls';
import { SiteNav } from '../site-nav/site-nav';

/**
 * Desktop sidebar. It only opens and closes with the pin button (no hover behavior).
 * The content always keeps its expanded size and the bar just clips it while animating its width,
 * so nothing reflows mid-animation. While collapsed, the palette lives in a popover next to the rail.
 */
@Component({
  selector: 'app-sidebar',
  imports: [TranslocoPipe, Icon, PalettePicker, SiteNav, SiteControls],
  templateUrl: './sidebar.html',
  host: {
    '(document:click)': 'closeOnOutsideClick($event)',
    '(document:keydown.escape)': 'paletteOpen.set(false)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  protected readonly layout = inject(LayoutStateService);
  protected readonly palette = inject(PaletteService).palette;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly paletteOpen = signal(false);

  protected togglePin(): void {
    this.paletteOpen.set(false);
    this.layout.togglePinned();
  }

  protected closeOnOutsideClick(event: Event): void {
    if (this.paletteOpen() && !this.host.nativeElement.contains(event.target as Node)) {
      this.paletteOpen.set(false);
    }
  }
}
