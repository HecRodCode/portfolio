import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeService } from '../../core/theme/theme.service';
import { Icon } from '../../shared/ui/icon/icon';
import { LanguageSwitcher } from '../../shared/ui/language-switcher/language-switcher';
import { PalettePicker } from '../../shared/ui/palette-picker/palette-picker';

/** Palette, theme and language controls, shared by the sidebar and the mobile menu. */
@Component({
  selector: 'app-site-controls',
  imports: [TranslocoPipe, Icon, LanguageSwitcher, PalettePicker],
  templateUrl: './site-controls.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteControls {
  /** Compact: icon-sized controls for the collapsed rail (no palette list). */
  readonly compact = input(false);

  protected readonly themeService = inject(ThemeService);
}
