import { Routes } from '@angular/router';
import { langActivate, langMatch, redirectToPreferredLang } from './core/i18n/language.guards';

const placeholder = () =>
  import('./features/placeholder/placeholder-page').then((m) => m.PlaceholderPage);

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: redirectToPreferredLang },
  {
    path: ':lang',
    canMatch: [langMatch],
    canActivate: [langActivate],
    loadComponent: () => import('./layout/shell/shell').then((m) => m.Shell),
    children: [
      // Temporary pages: each section replaces its placeholder in its own feature branch.
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about').then((m) => m.About),
      },
      { path: 'projects', loadComponent: placeholder, data: { titleKey: 'nav.projects' } },
      { path: 'contact', loadComponent: placeholder, data: { titleKey: 'nav.contact' } },
      {
        path: 'styles',
        loadComponent: () =>
          import('./features/styles-guide/styles-guide').then((m) => m.StylesGuide),
      },
    ],
  },
  { path: '**', redirectTo: redirectToPreferredLang },
];
