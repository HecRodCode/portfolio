import { TestBed } from '@angular/core/testing';
import { PaletteService, isPaletteId } from './palette.service';

describe('PaletteService', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['palette'];
  });

  it('defaults to the red & blue palette', () => {
    expect(TestBed.inject(PaletteService).palette()).toBe('red-blue');
  });

  it('ignores an unknown stored palette', () => {
    localStorage.setItem('palette', 'nope');
    expect(TestBed.inject(PaletteService).palette()).toBe('red-blue');
  });

  it('applies and persists the chosen palette', () => {
    const service = TestBed.inject(PaletteService);
    service.set('indigo-rose');
    TestBed.tick();

    expect(document.documentElement.dataset['palette']).toBe('indigo-rose');
    expect(localStorage.getItem('palette')).toBe('indigo-rose');
  });

  it('validates palette ids', () => {
    expect(isPaletteId('cobalt-mint')).toBe(true);
    expect(isPaletteId('red')).toBe(false);
  });
});
