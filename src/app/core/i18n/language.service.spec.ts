import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { TranslocoLoader, provideTransloco } from '@jsverse/transloco';
import { of } from 'rxjs';
import { isLang } from './i18n.config';
import { LanguageService } from './language.service';

@Injectable()
class EmptyLoader implements TranslocoLoader {
  getTranslation() {
    return of({});
  }
}

describe('LanguageService', () => {
  let service: LanguageService;
  let router: Router;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: '**', children: [] }]),
        provideTransloco({
          config: { availableLangs: ['es', 'en'], defaultLang: 'es' },
          loader: EmptyLoader,
        }),
      ],
    });
    service = TestBed.inject(LanguageService);
    router = TestBed.inject(Router);
  });

  it('prefers the default language when nothing is saved', () => {
    expect(service.preferred()).toBe('es');
  });

  it('prefers the saved language', () => {
    localStorage.setItem('lang', 'en');
    expect(service.preferred()).toBe('en');
  });

  it('applies a language to the signal and the html lang attribute', () => {
    service.apply('en');
    expect(service.current()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('switches language keeping the rest of the path and saves the choice', async () => {
    await router.navigateByUrl('/es/projects/foo?x=1#top');
    service.switchTo('en');
    await new Promise((resolve) => setTimeout(resolve));
    expect(router.url).toBe('/en/projects/foo?x=1#top');
    expect(localStorage.getItem('lang')).toBe('en');
  });
});

describe('isLang', () => {
  it('accepts supported languages only', () => {
    expect(isLang('es')).toBe(true);
    expect(isLang('en')).toBe(true);
    expect(isLang('fr')).toBe(false);
    expect(isLang(undefined)).toBe(false);
  });
});
