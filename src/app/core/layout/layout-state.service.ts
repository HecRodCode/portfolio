import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

const PINNED_KEY = 'sidebar-pinned';
const MENU_OPEN_CLASS = 'has-menu-open';

@Injectable({ providedIn: 'root' })
export class LayoutStateService {
  private readonly document = inject(DOCUMENT);

  /** Desktop sidebar: pinned keeps it expanded; otherwise it expands on hover/focus. */
  readonly pinned = signal(this.readPinned());
  /** Mobile hamburger menu. */
  readonly menuOpen = signal(false);

  constructor() {
    effect(() => {
      this.document.body.classList.toggle(MENU_OPEN_CLASS, this.menuOpen());
    });
  }

  togglePinned(): void {
    this.pinned.update((value) => !value);
    try {
      this.document.defaultView?.localStorage.setItem(PINNED_KEY, String(this.pinned()));
    } catch {
      // Storage can be unavailable; the state still applies for this session.
    }
  }

  openMenu(): void {
    this.menuOpen.set(true);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  private readPinned(): boolean {
    try {
      return this.document.defaultView?.localStorage.getItem(PINNED_KEY) === 'true';
    } catch {
      return false;
    }
  }
}
