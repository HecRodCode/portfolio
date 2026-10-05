import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ExternalLinkService } from '../../../core/external-link/external-link.service';

/**
 * Confirmation shown before leaving the site. Built on the native `<dialog>`, which already traps focus,
 * closes with Esc and returns focus to the link that opened it. One instance lives in the shell.
 */
@Component({
  selector: 'app-external-link-dialog',
  imports: [TranslocoPipe],
  templateUrl: './external-link-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalLinkDialog {
  protected readonly links = inject(ExternalLinkService);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const open = this.links.request() !== null;
      const element = this.dialog().nativeElement;
      if (open && !element.open) element.showModal();
      else if (!open && element.open) element.close();
    });
  }

  /** Esc, the buttons and the backdrop all end up here through the native `close` event. */
  protected onClosed(): void {
    this.links.close();
  }

  /** A click on the dialog box itself (not its content) is a click on the backdrop. */
  protected onClick(event: MouseEvent): void {
    const element = this.dialog().nativeElement;
    if (event.target === element) element.close();
  }
}
