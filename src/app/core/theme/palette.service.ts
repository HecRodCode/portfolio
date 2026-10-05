import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export interface Palette {
  readonly id: string;
  readonly label: string;
}

/** Ids match the `[data-palette]` rules in styles/base/theme.css and palettes.css. */
export const PALETTES = [
  { id: 'red-blue', label: 'Red & blue' },
  { id: 'teal-coral', label: 'Teal & coral' },
  { id: 'indigo-rose', label: 'Indigo & rose' },
  { id: 'forest-terracotta', label: 'Forest & terracotta' },
  { id: 'plum-ochre', label: 'Plum & ochre' },
  { id: 'slate-tangerine', label: 'Slate & tangerine' },
  { id: 'cobalt-mint', label: 'Cobalt & mint' },
] as const satisfies readonly Palette[];

export type PaletteId = (typeof PALETTES)[number]['id'];

export const DEFAULT_PALETTE: PaletteId = 'red-blue';

const STORAGE_KEY = 'palette';

export const isPaletteId = (value: unknown): value is PaletteId =>
  PALETTES.some((palette) => palette.id === value);

@Injectable({ providedIn: 'root' })
export class PaletteService {
  private readonly document = inject(DOCUMENT);

  readonly palettes = PALETTES;
  readonly palette = signal<PaletteId>(this.resolveInitialPalette());

  constructor() {
    effect(() => {
      // setAttribute (not dataset): the server-side DOM used for prerendering has no `dataset`.
      this.document.documentElement.setAttribute('data-palette', this.palette());
    });
  }

  set(palette: PaletteId): void {
    this.palette.set(palette);
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, palette);
    } catch {
      // Storage can be unavailable (private mode); the palette still applies for this session.
    }
  }

  private resolveInitialPalette(): PaletteId {
    try {
      const stored = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      if (isPaletteId(stored)) return stored;
    } catch {
      // ignore unavailable storage
    }
    return DEFAULT_PALETTE;
  }
}
