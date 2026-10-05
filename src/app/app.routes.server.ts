import { RenderMode, ServerRoute } from '@angular/ssr';
import { LANGS } from './core/i18n/i18n.config';

const prerenderLangs = async () => LANGS.map((lang) => ({ lang }));

/**
 * Static prerender: every page of every language is built as real HTML (HTTP 200 on GitHub Pages),
 * instead of relying on the 404.html fallback. Add new pages here when their route is added.
 */
export const serverRoutes: ServerRoute[] = [
  { path: ':lang', renderMode: RenderMode.Prerender, getPrerenderParams: prerenderLangs },
  { path: ':lang/about', renderMode: RenderMode.Prerender, getPrerenderParams: prerenderLangs },
  { path: ':lang/projects', renderMode: RenderMode.Prerender, getPrerenderParams: prerenderLangs },
  { path: ':lang/contact', renderMode: RenderMode.Prerender, getPrerenderParams: prerenderLangs },
  { path: ':lang/styles', renderMode: RenderMode.Prerender, getPrerenderParams: prerenderLangs },
  // Redirects (`/`, unknown languages) and unknown paths run in the browser
  { path: '**', renderMode: RenderMode.Client },
];
