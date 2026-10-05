import { Injectable, signal } from '@angular/core';

export interface ExternalLinkRequest {
  readonly url: string;
  readonly host: string;
}

/** Holds the external link the visitor is about to follow, until they confirm or cancel. */
@Injectable({ providedIn: 'root' })
export class ExternalLinkService {
  readonly request = signal<ExternalLinkRequest | null>(null);

  open(url: string): void {
    let host = url;
    try {
      host = new URL(url).host;
    } catch {
      // Not a parsable URL: the dialog just shows it as given.
    }
    this.request.set({ url, host });
  }

  close(): void {
    this.request.set(null);
  }
}
