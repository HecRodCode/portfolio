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
  'map-pin': [
    'M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z',
    'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  ],
  'graduation-cap': [
    'M2 9l10-5 10 5-10 5z',
    'M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5',
    'M22 9v6',
  ],
  laptop: ['M5 5h14a1 1 0 0 1 1 1v9H4V6a1 1 0 0 1 1-1z', 'M2 19h20'],
  sprout: [
    'M12 21V11',
    'M12 11c0-3.5 2.4-6 7-6 0 3.6-2.4 6-7 6z',
    'M12 14.5c0-2.8-1.9-4.5-6-4.5 0 3 1.9 4.5 6 4.5z',
  ],
  database: [
    'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z',
    'M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6',
    'M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  ],
  'bar-chart': ['M5 20V11', 'M12 20V4', 'M19 20v-6'],
  server: ['M4 4h16v6H4z', 'M4 14h16v6H4z', 'M7.5 7h.01', 'M7.5 17h.01'],
  cloud: ['M7 18a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 9.5 4.3 4.3 0 0 1 17.5 18z'],
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
