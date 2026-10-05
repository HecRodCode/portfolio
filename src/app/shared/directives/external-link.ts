import { Directive, ElementRef, inject } from '@angular/core';
import { ExternalLinkService } from '../../core/external-link/external-link.service';

/**
 * Marks an `<a href>` as leading outside the site: it opens in a new tab and a plain click asks for
 * confirmation first. Modified clicks (new tab, new window...) and middle clicks keep the browser default.
 */
@Directive({
  selector: 'a[appExternalLink]',
  host: {
    target: '_blank',
    rel: 'noopener noreferrer',
    '(click)': 'onClick($event)',
  },
})
export class ExternalLink {
  private readonly element = inject<ElementRef<HTMLAnchorElement>>(ElementRef).nativeElement;
  private readonly links = inject(ExternalLinkService);

  protected onClick(event: MouseEvent): void {
    const modified = event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
    if (event.defaultPrevented || event.button !== 0 || modified) return;
    event.preventDefault();
    this.links.open(this.element.href);
  }
}
