import { Routes } from '@angular/router';
import { langActivate, langMatch, redirectToPreferredLang } from './core/i18n/language.guards';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: redirectToPreferredLang },
  {
    path: ':lang',
    canMatch: [langMatch],
    canActivate: [langActivate],
    children: [
      // Temporary: the real home arrives with the layout and features branches.
      { path: '', pathMatch: 'full', redirectTo: 'styles' },
      {
        path: 'styles',
        loadComponent: () =>
          import('./features/styles-guide/styles-guide').then((m) => m.StylesGuide),
      },
    ],
  },
  { path: '**', redirectTo: redirectToPreferredLang },
];
