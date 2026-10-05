import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { DEFAULT_LANG, Lang, isLang } from './i18n.config';

const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly transloco = inject(TranslocoService);

  readonly current = signal<Lang>(DEFAULT_LANG);

  /** Language to use when the URL has none: the saved choice, else the default. */
  preferred(): Lang {
    try {
      const stored = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      if (isLang(stored)) return stored;
    } catch {
      // ignore unavailable storage
    }
    return DEFAULT_LANG;
  }

  /** Applies a language that came from the URL. */
  apply(lang: Lang): void {
    this.current.set(lang);
    this.transloco.setActiveLang(lang);
    this.document.documentElement.lang = lang;
  }

  /** Navigates to the same page in another language and remembers the choice. */
  switchTo(lang: Lang): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // the language still changes for this session
    }
    const tree = this.router.parseUrl(this.router.url);
    const [first, ...rest] = tree.root.children['primary']?.segments ?? [];
    if (!first) return;
    void this.router.navigateByUrl(
      this.router.createUrlTree([lang, ...rest.map((s) => s.path)], {
        queryParams: tree.queryParams,
        fragment: tree.fragment ?? undefined,
      }),
    );
  }
}
