import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTestTransloco } from '../../../testing/transloco-testing';
import { SiteNav } from './site-nav';

describe('SiteNav', () => {
  it('links home without a trailing slash so it matches the active URL', async () => {
    TestBed.configureTestingModule({
      imports: [SiteNav],
      providers: [provideRouter([]), provideTestTransloco()],
    });
    const fixture = TestBed.createComponent(SiteNav);
    await fixture.whenStable();

    const hrefs = [...(fixture.nativeElement as HTMLElement).querySelectorAll('a')].map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toEqual(['/es', '/es/about', '/es/projects', '/es/contact']);
  });
});
