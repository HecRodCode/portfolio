import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTestTransloco } from '../../../testing/transloco-testing';
import { SKILL_GROUPS } from '../../data/skills';
import { About } from './about';

describe('About', () => {
  async function render() {
    TestBed.configureTestingModule({
      imports: [About],
      providers: [provideRouter([]), provideTestTransloco()],
    });
    const fixture = TestBed.createComponent(About);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the story, the facts, every skill and the education entry', async () => {
    const root = await render();

    expect(root.querySelector('h1')).not.toBeNull();
    expect(root.querySelectorAll('.story-block').length).toBe(2);
    expect(root.querySelectorAll('.journey-step').length).toBe(4);
    expect(root.querySelectorAll('.facts-row').length).toBe(4);
    expect(root.querySelectorAll('.facts-icon svg').length).toBe(4);

    const total = SKILL_GROUPS.reduce((sum, group) => sum + group.items.length, 0);
    expect(root.querySelectorAll('.skill').length).toBe(total);
    expect(root.querySelectorAll('.timeline-item').length).toBe(1);
  });

  it('shows a logo (image or icon) for every skill', async () => {
    const root = await render();
    const skills = [...root.querySelectorAll('.skill')];
    expect(skills.every((skill) => skill.querySelector('img, app-icon'))).toBe(true);
  });

  it('has an in-page index (no numbers) pointing at every section', async () => {
    const root = await render();
    const links = [...root.querySelectorAll<HTMLAnchorElement>('.toc-link')];

    const ids = links.map((link) => link.getAttribute('href')!.split('#')[1]);

    expect(ids).toEqual(['story', 'experience', 'stack', 'education']);
    for (const id of ids) expect(root.querySelector(`#${id}`)).not.toBeNull();
  });

  it('shows a notice while there is no experience to list', async () => {
    const root = await render();
    expect(root.querySelector('#experience p.card')).not.toBeNull();
  });

  it('has no calls to action: navigation lives in the sidebar', async () => {
    const root = await render();
    expect(root.querySelector('a.btn')).toBeNull();
  });
});
