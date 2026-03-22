import { TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
  function setup(locale: string) {
    TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent],
      providers: [{ provide: LOCALE_ID, useValue: locale }],
    }).compileComponents();
    const fixture = TestBed.createComponent(LanguageSwitcherComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  afterEach(() => TestBed.resetTestingModule());

  it('should create the component', () => {
    const el = setup('hu');
    expect(el.querySelector('nav')).toBeTruthy();
  });

  it('should render both /hu/ and /en/ links', () => {
    const el = setup('hu');
    const links = el.querySelectorAll('a');
    const hrefs = Array.from(links).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/hu/');
    expect(hrefs).toContain('/en/');
  });

  it('should have a nav with aria-label', () => {
    const el = setup('hu');
    const nav = el.querySelector('nav');
    expect(nav).toBeTruthy();
    expect(nav!.getAttribute('aria-label')).toBeTruthy();
  });

  it('HU locale: /hu/ link has aria-current="page"', () => {
    const el = setup('hu');
    const huLink = el.querySelector<HTMLAnchorElement>('a[href="/hu/"]')!;
    expect(huLink.getAttribute('aria-current')).toBe('page');
  });

  it('HU locale: /en/ link has no aria-current', () => {
    const el = setup('hu');
    const enLink = el.querySelector<HTMLAnchorElement>('a[href="/en/"]')!;
    expect(enLink.getAttribute('aria-current')).toBeNull();
  });

  it('EN locale: /en/ link has aria-current="page"', () => {
    const el = setup('en');
    const enLink = el.querySelector<HTMLAnchorElement>('a[href="/en/"]')!;
    expect(enLink.getAttribute('aria-current')).toBe('page');
  });

  it('EN locale: /hu/ link has no aria-current', () => {
    const el = setup('en');
    const huLink = el.querySelector<HTMLAnchorElement>('a[href="/hu/"]')!;
    expect(huLink.getAttribute('aria-current')).toBeNull();
  });

  it('separator | is aria-hidden', () => {
    const el = setup('hu');
    const separator = el.querySelector('[aria-hidden="true"]');
    expect(separator).toBeTruthy();
  });

  it('each link has hreflang and lang attributes', () => {
    const el = setup('hu');
    const huLink = el.querySelector<HTMLAnchorElement>('a[href="/hu/"]')!;
    const enLink = el.querySelector<HTMLAnchorElement>('a[href="/en/"]')!;
    expect(huLink.getAttribute('hreflang')).toBe('hu');
    expect(huLink.getAttribute('lang')).toBe('hu');
    expect(enLink.getAttribute('hreflang')).toBe('en');
    expect(enLink.getAttribute('lang')).toBe('en');
  });

  it('no routerLink on any anchor', () => {
    const el = setup('hu');
    const links = el.querySelectorAll('a[routerLink], a[ng-reflect-router-link]');
    expect(links.length).toBe(0);
  });
});
