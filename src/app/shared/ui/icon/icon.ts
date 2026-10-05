import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const ICONS = {
  home: ['M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z'],
  user: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M4 21c1-4 4-6 8-6s7 2 8 6'],
  code: ['M8 8l-5 4 5 4', 'M16 8l5 4-5 4', 'M14 5l-4 14'],
  mail: ['M3 6h18v12H3z', 'M3 7l9 6 9-6'],
  sun: [
    'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5',
  ],
  moon: ['M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z'],
  pin: ['M9 3h6l-1 6 3 3v2H7v-2l3-3z', 'M12 14v7'],
  'pin-off': ['M9 3h6l-1 6 3 3v2H7v-2l3-3z', 'M12 14v7', 'M4 4l16 16'],
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  menu: ['M4 6h16M4 12h16M4 18h16'],
  close: ['M6 6l12 12M18 6L6 18'],
} as const;

export type IconName = keyof typeof ICONS;

@Component({
  selector: 'app-icon',
  template: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
    @for (d of paths(); track d) {
      <path [attr.d]="d" />
    }
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<IconName>();
  protected readonly paths = computed(() => ICONS[this.name()]);
}
