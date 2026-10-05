import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideTestTransloco } from '../../../../testing/transloco-testing';
import { ExternalLinkService } from '../../../core/external-link/external-link.service';
import { ExternalLink } from '../../directives/external-link';
import { ExternalLinkDialog } from './external-link-dialog';

@Component({
  imports: [ExternalLink, ExternalLinkDialog],
  template: `
    <a id="link" appExternalLink href="https://riwi.io/">Riwi</a>
    <app-external-link-dialog />
  `,
})
class Host {}

describe('ExternalLinkDialog', () => {
  beforeEach(() => {
    // jsdom does not implement the modal API of <dialog>
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute('open', '');
    };
    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    };
    TestBed.configureTestingModule({ providers: [provideTestTransloco()] });
  });

  async function render() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('opens in a new tab safely and asks before leaving on a plain click', async () => {
    const root = await render();
    const link = root.querySelector<HTMLAnchorElement>('#link')!;
    const dialog = root.querySelector('dialog')!;

    expect(link.target).toBe('_blank');
    expect(link.rel).toBe('noopener noreferrer');
    expect(dialog.open).toBe(false);

    link.click();
    (await TestBed.inject(ExternalLinkService).request()) && (await Promise.resolve());
    TestBed.tick();
    expect(dialog.open).toBe(true);
    expect(dialog.querySelector<HTMLAnchorElement>('a')?.href).toBe('https://riwi.io/');
  });

  it('closes on cancel and clears the pending link', async () => {
    const root = await render();
    root.querySelector<HTMLAnchorElement>('#link')!.click();
    TestBed.tick();

    root.querySelector<HTMLButtonElement>('dialog button')!.click();
    TestBed.tick();
    expect(root.querySelector('dialog')!.open).toBe(false);
    expect(TestBed.inject(ExternalLinkService).request()).toBeNull();
  });

  it('lets modified clicks through without the dialog', async () => {
    const root = await render();
    const event = new MouseEvent('click', { ctrlKey: true, bubbles: true, cancelable: true });
    root.querySelector<HTMLAnchorElement>('#link')!.dispatchEvent(event);
    TestBed.tick();

    expect(event.defaultPrevented).toBe(false);
    expect(TestBed.inject(ExternalLinkService).request()).toBeNull();
  });
});
