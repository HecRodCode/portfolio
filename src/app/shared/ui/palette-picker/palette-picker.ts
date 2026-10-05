import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { PaletteService } from '../../../core/theme/palette.service';

@Component({
  selector: 'app-palette-picker',
  imports: [TranslocoPipe],
  templateUrl: './palette-picker.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PalettePicker {
  protected readonly paletteService = inject(PaletteService);

  /** Emitted after the user picks a palette (lets a popover close itself). */
  readonly chosen = output<void>();
}
