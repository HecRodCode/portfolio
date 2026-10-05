import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTestTransloco } from '../../../testing/transloco-testing';
import { SITE } from '../../core/site.config';
import { Home } from './home';

describe('Home', () => {
  it('shows the name, the portrait and links to about, projects and contact', async () => {
    TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([]), provideTestTransloco()],
    });
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain(SITE.name);
    const hrefs = [...root.querySelectorAll('a.btn')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/es/about', '/es/projects', '/es/contact']);
    expect(root.querySelector('img')?.getAttribute('alt')).toBeTruthy();
  });
});
