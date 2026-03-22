import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LanguageSwitcherComponent],
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
    // og:image — absolute URL beállítandó go-live előtt (Epic 5)
    this.#meta.updateTag({ property: 'og:image', content: '/assets/og/og-preview.jpg' });
    this.#meta.updateTag({ name: 'description', content: $localize`:@@meta.og-description:Professzionális táncoktatás és koreográfia` });
  }
}
