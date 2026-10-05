import { Routes } from '@angular/router';

export const routes: Routes = [
  // Temporary: the real home arrives with the layout and features branches.
  { path: '', pathMatch: 'full', redirectTo: 'styles' },
  {
    path: 'styles',
    loadComponent: () => import('./features/styles-guide/styles-guide').then((m) => m.StylesGuide),
  },
];
