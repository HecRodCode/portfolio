import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTestTransloco } from '../../../testing/transloco-testing';
import { MobileMenu } from './mobile-menu';

describe('MobileMenu', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [MobileMenu],
      providers: [provideRouter([]), provideTestTransloco()],
    }).compileComponents();
  });

  it('opens from the hamburger and closes with Escape', async () => {
    const fixture = TestBed.createComponent(MobileMenu);
    const root = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();

    const burger = root.querySelector<HTMLButtonElement>('header button')!;
    expect(burger.getAttribute('aria-expanded')).toBe('false');
    expect(root.querySelector('#mobile-menu')).toBeNull();

    burger.click();
    await fixture.whenStable();
    expect(burger.getAttribute('aria-expanded')).toBe('true');
    expect(root.querySelector('#mobile-menu')).not.toBeNull();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    expect(root.querySelector('#mobile-menu')).toBeNull();
  });

  it('makes the top bar inert while the menu is open, so focus cannot leave it', async () => {
    const fixture = TestBed.createComponent(MobileMenu);
    const root = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
    const bar = root.querySelector('.mobile-bar')!;
    expect(bar.hasAttribute('inert')).toBe(false);

    root.querySelector<HTMLButtonElement>('header button')!.click();
    await fixture.whenStable();
    expect(bar.hasAttribute('inert')).toBe(true);
  });
});
