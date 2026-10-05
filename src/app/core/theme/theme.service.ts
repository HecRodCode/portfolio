import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<Theme>(this.resolveInitialTheme());

  constructor() {
    effect(() => {
      this.document.documentElement.classList.toggle('dark', this.theme() === 'dark');
    });
  }

  set(theme: Theme): void {
    this.theme.set(theme);
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this session.
    }
  }

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  /** Stored choice wins; on the first visit follow the system preference, falling back to dark. */
  private resolveInitialTheme(): Theme {
    const view = this.document.defaultView;
    try {
      const stored = view?.localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // ignore unavailable storage
    }
    return view?.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
}
