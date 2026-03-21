import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SsrProbeComponent } from './components/ssr-probe/ssr-probe.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SsrProbeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
