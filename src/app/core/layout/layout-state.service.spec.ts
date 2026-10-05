import { TestBed } from '@angular/core/testing';
import { LayoutStateService } from './layout-state.service';

describe('LayoutStateService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.classList.remove('has-menu-open');
  });

  it('starts unpinned and restores a saved pin', () => {
    expect(TestBed.inject(LayoutStateService).pinned()).toBe(false);
    TestBed.resetTestingModule();
    localStorage.setItem('sidebar-pinned', 'true');
    expect(TestBed.inject(LayoutStateService).pinned()).toBe(true);
  });

  it('toggles and persists the pinned state', () => {
    const service = TestBed.inject(LayoutStateService);
    service.togglePinned();
    expect(service.pinned()).toBe(true);
    expect(localStorage.getItem('sidebar-pinned')).toBe('true');
    service.togglePinned();
    expect(localStorage.getItem('sidebar-pinned')).toBe('false');
  });

  it('locks the page scroll while the mobile menu is open', () => {
    const service = TestBed.inject(LayoutStateService);
    service.openMenu();
    TestBed.tick();
    expect(document.body.classList.contains('has-menu-open')).toBe(true);
    service.closeMenu();
    TestBed.tick();
    expect(document.body.classList.contains('has-menu-open')).toBe(false);
  });
});
