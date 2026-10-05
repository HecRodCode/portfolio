import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router, TitleStrategy, provideRouter } from '@angular/router';
import { provideTestTransloco } from '../../../testing/transloco-testing';
import { SITE } from '../site.config';
import { PageTitleStrategy } from './page-title.strategy';

@Component({ template: '' })
class Page {}

describe('PageTitleStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideTestTransloco(),
        { provide: TitleStrategy, useClass: PageTitleStrategy },
        provideRouter([
          { path: 'about', component: Page, data: { titleKey: 'nav.about' } },
          { path: 'plain', component: Page },
        ]),
      ],
    });
  });

  it('titles the page with its translated name and the site name', async () => {
    await TestBed.inject(Router).navigateByUrl('/about');
    expect(TestBed.inject(Title).getTitle()).toBe(`nav.about · ${SITE.name}`);
  });

  it('falls back to the site name when the route has no title key', async () => {
    await TestBed.inject(Router).navigateByUrl('/plain');
    expect(TestBed.inject(Title).getTitle()).toBe(SITE.name);
  });
});
