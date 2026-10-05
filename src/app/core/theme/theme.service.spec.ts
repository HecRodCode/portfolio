import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('uses the stored theme when there is one', () => {
    localStorage.setItem('theme', 'light');
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('light');
  });

  it('toggles, persists and applies the dark class', async () => {
    localStorage.setItem('theme', 'light');
    const service = TestBed.inject(ThemeService);

    service.toggle();
    TestBed.tick();

    expect(service.theme()).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
