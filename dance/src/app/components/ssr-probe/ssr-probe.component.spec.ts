import { TestBed } from '@angular/core/testing';
import { SsrProbeComponent } from './ssr-probe.component';

describe('SsrProbeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsrProbeComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SsrProbeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should start with server renderEnv', () => {
    const fixture = TestBed.createComponent(SsrProbeComponent);
    const component = fixture.componentInstance;
    expect(component['renderEnv']()).toBe('server');
  });
});
