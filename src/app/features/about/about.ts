import {
  ChangeDetectionStrategy,
  DestroyRef,
  Component,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { EXPERIENCE } from '../../data/experience';
import { SKILL_GROUPS } from '../../data/skills';
import { ExternalLink } from '../../shared/directives/external-link';
import { Icon } from '../../shared/ui/icon/icon';

/** Sections of the page, in display order. They double as the in-page index and URL fragments. */
const SECTIONS = ['story', 'experience', 'stack', 'education'] as const;
type SectionId = (typeof SECTIONS)[number];

@Component({
  selector: 'app-about',
  imports: [RouterLink, TranslocoPipe, Icon, ExternalLink],
  templateUrl: './about.html',
  host: { '(window:scroll)': 'onScroll()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly sections = SECTIONS;
  protected readonly active = signal<SectionId>('story');

  /** After a click, scroll-spy stays quiet until the smooth scroll to the section is done. */
  private lockedUntil = 0;

  protected readonly skillGroups = SKILL_GROUPS;
  protected readonly experience = EXPERIENCE;
  protected readonly riwiUrl = 'https://riwi.io/';
  protected readonly storyBlocks = [
    { key: 'path', icon: 'user' },
    { key: 'data', icon: 'bar-chart' },
  ] as const;
  protected readonly journey = [
    { key: 'web', icon: 'laptop' },
    { key: 'backend', icon: 'server' },
    { key: 'data', icon: 'database' },
    { key: 'cloud', icon: 'cloud' },
  ] as const;
  protected readonly facts = [
    { key: 'location', icon: 'map-pin' },
    { key: 'studying', icon: 'graduation-cap' },
    { key: 'focus', icon: 'laptop' },
    { key: 'learning', icon: 'sprout' },
  ] as const;

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Scroll-spy: the section crossing a band near the top of the viewport is the active one.
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !this.isLocked()) {
              this.setFromScroll(entry.target.id as SectionId);
            }
          }
        },
        { rootMargin: '-25% 0px -65% 0px' },
      );
      for (const id of SECTIONS) {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected select(id: SectionId): void {
    this.active.set(id);
    this.lockedUntil = performance.now() + 1000;
  }

  protected onScroll(): void {
    if (!this.isLocked()) this.setFromScroll(this.active());
  }

  /** The last section is short, so near the bottom of the page it never reaches the detection band. */
  private setFromScroll(candidate: SectionId): void {
    const atBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    this.active.set(atBottom ? SECTIONS[SECTIONS.length - 1] : candidate);
  }

  private isLocked(): boolean {
    return performance.now() < this.lockedUntil;
  }
}
