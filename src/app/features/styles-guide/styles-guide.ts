import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../core/theme/theme.service';

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
  templateUrl: './styles-guide.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesGuide {
  protected readonly themeService = inject(ThemeService);

  protected readonly scales = [
    { title: 'Red', swatches: scale('red') },
    { title: 'Blue', swatches: scale('blue') },
    { title: 'Gray', swatches: scale('gray') },
  ];

  protected readonly tokens: Swatch[] = [
    'bg',
    'surface',
    'surface-2',
    'border',
    'muted',
    'text',
    'accent',
    'accent-fill',
    'accent-soft',
    'accent-2',
    'accent-2-fill',
    'accent-2-soft',
  ].map((name) => ({ name, cssClass: `swatch-token-${name}` }));
}
