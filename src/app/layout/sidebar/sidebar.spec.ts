import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTestTransloco } from '../../../testing/transloco-testing';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [provideRouter([]), provideTestTransloco()],
    }).compileComponents();
  });

  it('renders the four sections', async () => {
    const fixture = TestBed.createComponent(Sidebar);
    await fixture.whenStable();
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll('nav a');
    expect(links.length).toBe(4);
  });

  it('toggles pinning from the pin button', async () => {
    const fixture = TestBed.createComponent(Sidebar);
    const root = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();

    const pin = root.querySelector<HTMLButtonElement>('.sidebar-pin')!;
    expect(pin.getAttribute('aria-pressed')).toBe('false');
    pin.click();
    await fixture.whenStable();
    expect(pin.getAttribute('aria-pressed')).toBe('true');
    expect(root.querySelector('.sidebar')!.classList.contains('is-pinned')).toBe(true);
  });

  it('opens a palette panel from the collapsed rail and closes it after picking', async () => {
    const fixture = TestBed.createComponent(Sidebar);
    const root = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();

    expect(root.querySelector('.palette-popover')).toBeNull();
    root.querySelector<HTMLButtonElement>('.sidebar-bottom-rail .palette-option')!.click();
    await fixture.whenStable();

    const options = root.querySelectorAll<HTMLButtonElement>('.palette-popover .palette-option');
    expect(options.length).toBe(7);

    options[2].click();
    await fixture.whenStable();
    expect(document.documentElement.dataset['palette']).toBe('indigo-rose');
    expect(root.querySelector('.palette-popover')).toBeNull();
  });
});
