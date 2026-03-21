import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly #meta = inject(Meta);
  readonly #title = inject(Title);

  constructor() {
    this.#title.setTitle($localize`:@@meta.title:Zsófi Tánciskola | Tánc és mozgás`);
    this.#meta.updateTag({ property: 'og:type', content: 'website' });
    this.#meta.updateTag({ property: 'og:locale', content: $localize`:@@meta.og-locale:hu_HU` });
    this.#meta.updateTag({ property: 'og:title', content: $localize`:@@meta.og-title:Zsófi Tánciskola` });
    this.#meta.updateTag({ property: 'og:description', content: $localize`:@@meta.og-description:Professzionális táncoktatás és koreográfia` });
  }
}
