import { Component, inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
})
export class LanguageSwitcherComponent {
  protected readonly locale = inject(LOCALE_ID);
}
