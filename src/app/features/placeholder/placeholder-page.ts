import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

/** Temporary page for sections that are built in their own feature branches. */
@Component({
  selector: 'app-placeholder-page',
  imports: [TranslocoPipe],
  template: `
    <section class="section">
      <div class="container container-md stack">
        <h1 class="heading-1">{{ titleKey | transloco }}</h1>
        <p class="lead">{{ 'placeholder.soon' | transloco }}</p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderPage {
  protected readonly titleKey = inject(ActivatedRoute).snapshot.data['titleKey'] as string;
}
