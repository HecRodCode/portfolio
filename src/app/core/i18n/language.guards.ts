import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, RedirectFunction } from '@angular/router';
import { LanguageService } from './language.service';
import { isLang } from './i18n.config';

/** Only matches `/:lang` when the first segment is a supported language. */
export const langMatch: CanMatchFn = (_route, segments) => isLang(segments[0]?.path);

/** Syncs the active language with the URL on every navigation under `/:lang`. */
export const langActivate: CanActivateFn = (route) => {
  const lang = route.paramMap.get('lang');
  if (isLang(lang)) inject(LanguageService).apply(lang);
  return true;
};

/** Sends `/` and unknown paths to the preferred language. */
export const redirectToPreferredLang: RedirectFunction = () =>
  `/${inject(LanguageService).preferred()}`;
