import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  private tempTextArea: HTMLTextAreaElement | undefined;
  private readonly window: Window;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    if (isPlatformBrowser(platformId)) {
      this.window = window;
    } else {
      this.window = null;
    }
  }

  public get isSupported(): boolean {
    return (
      !!this.document.queryCommandSupported &&
      !!this.document.queryCommandSupported('copy')
    );
  }

  /**
   * copyFromInputElement
   */
  public copyFromInputElement(
    targetElm: HTMLInputElement | HTMLTextAreaElement
  ): boolean {
    try {
      this.selectTarget(targetElm);
      const re = this.copyText();
      this.clearSelection(targetElm, this.window);
      return re;
    } catch (error) {
      return false;
    }
  }

  /**
   * Creates a fake textarea element, sets its value from `text` property,
   * and makes a selection on it.
   */
  public copyFromContent(content: string) {
    if (!this.tempTextArea) {
      this.tempTextArea = this.createTempTextArea(this.document, this.window);
      this.document.body.appendChild(this.tempTextArea);
    }
    this.tempTextArea.value = content;
    return this.copyFromInputElement(this.tempTextArea);
  }

  // remove temporary textarea if any
  public destroy() {
    if (this.tempTextArea) {
      this.document.body.removeChild(this.tempTextArea);
      this.tempTextArea = undefined;
    }
  }

  // select the target html input element
  private selectTarget(
    inputElement: HTMLInputElement | HTMLTextAreaElement
  ): number | undefined {
    inputElement.select();
    inputElement.setSelectionRange(0, inputElement.value.length);
    return inputElement.value.length;
  }

  private copyText(): boolean {
    return this.document.execCommand('copy');
  }

  // Removes current selection and focus from `target` element.
  private clearSelection(
    inputElement: HTMLInputElement | HTMLTextAreaElement,
    window: Window
  ) {
    // tslint:disable-next-line:no-unused-expression
    inputElement && inputElement.blur();
    window.getSelection().removeAllRanges();
  }

  // create a fake textarea for copy command
  private createTempTextArea(
    doc: Document,
    window: Window
  ): HTMLTextAreaElement {
    const isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
    let ta: HTMLTextAreaElement;
    ta = doc.createElement('textarea');
    // Prevent zooming on iOS
    ta.style.fontSize = '12pt';
    // Reset box model
    ta.style.border = '0';
    ta.style.padding = '0';
    ta.style.margin = '0';
    // Move element out of screen horizontally
    ta.style.position = 'absolute';
    ta.style[isRTL ? 'right' : 'left'] = '-9999px';
    // Move element to the same position vertically
    const yPosition = window.pageYOffset || doc.documentElement.scrollTop;
    ta.style.top = yPosition + 'px';
    ta.setAttribute('readonly', '');
    return ta;
  }
}
