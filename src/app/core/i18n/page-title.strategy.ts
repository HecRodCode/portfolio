import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { take } from 'rxjs';
import { SITE } from '../site.config';

/** Sets a per-page, translated `<title>` ("About me · Name") from the `titleKey` in each route's data. */
@Injectable({ providedIn: 'root' })
export class PageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly transloco = inject(TranslocoService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const key = this.findKey(snapshot.root);
    if (!key) {
      this.title.setTitle(SITE.name);
      return;
    }
    this.transloco
      .selectTranslate<string>(key)
      .pipe(take(1))
      .subscribe((page) => this.title.setTitle(`${page} · ${SITE.name}`));
  }

  private findKey(route: ActivatedRouteSnapshot): string | null {
    let key: string | null = null;
    for (
      let current: ActivatedRouteSnapshot | null = route;
      current;
      current = current.firstChild
    ) {
      key = (current.data['titleKey'] as string | undefined) ?? key;
    }
    return key;
  }
}
