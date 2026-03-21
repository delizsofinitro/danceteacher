import { Component, inject, PLATFORM_ID, signal, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ssr-probe',
  standalone: true,
  templateUrl: './ssr-probe.component.html',
})
export class SsrProbeComponent {
  private platformId = inject(PLATFORM_ID);
  protected renderEnv = signal('server');

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.renderEnv.set('browser');
      }
    });
  }
}
