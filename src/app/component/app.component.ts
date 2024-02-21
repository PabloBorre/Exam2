import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {DetailsComponent} from "../details/details.component";
import {MapComponent} from "../map/map.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HomeComponent,
    RouterOutlet, RouterLink,
  MapComponent,
  DetailsComponent],
  styleUrl: './app.component.css',
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
`,
})
export class AppComponent {}
