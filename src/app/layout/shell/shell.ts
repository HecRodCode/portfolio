import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LayoutStateService } from '../../core/layout/layout-state.service';
import { MobileMenu } from '../mobile-menu/mobile-menu';
import { Sidebar } from '../sidebar/sidebar';

/** Page frame for every `/:lang` route: sidebar (desktop), top bar (mobile) and the routed content. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, TranslocoPipe, Sidebar, MobileMenu],
  templateUrl: './shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {
  protected readonly layout = inject(LayoutStateService);
}
