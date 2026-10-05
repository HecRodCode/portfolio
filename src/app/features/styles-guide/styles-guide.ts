import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PaletteService } from '../../core/theme/palette.service';
import { ThemeService } from '../../core/theme/theme.service';
import { LanguageSwitcher } from '../../shared/ui/language-switcher/language-switcher';

interface Swatch {
  readonly name: string;
  readonly cssClass: string;
}

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

const scale = (name: string): Swatch[] =>
  SHADES.map((shade) => ({ name: `${name}-${shade}`, cssClass: `swatch-${name}-${shade}` }));

/**
 * Temporary design-system showcase. Texts are hardcoded on purpose and the route
 * is removed once the real pages exist.
 */
@Component({
  selector: 'app-styles-guide',
  imports: [LanguageSwitcher],
  templateUrl: './styles-guide.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesGuide {
  protected readonly themeService = inject(ThemeService);
  protected readonly paletteService = inject(PaletteService);

  protected readonly scales = [
    { title: 'Primary', swatches: scale('primary') },
    { title: 'Secondary', swatches: scale('secondary') },
    { title: 'Gray', swatches: scale('gray') },
  ];

  protected readonly tokens: Swatch[] = [
    'bg',
    'surface',
    'surface-2',
    'border',
    'muted',
    'text',
    'primary',
    'primary-fill',
    'primary-soft',
    'secondary',
    'secondary-fill',
    'secondary-soft',
  ].map((name) => ({ name, cssClass: `swatch-token-${name}` }));
}
