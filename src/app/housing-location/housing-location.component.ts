import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Housinglocation } from '../housinglocation';
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterLink,
  ],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.state }}</p>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
      <a [routerLink]="['/map', housingLocation.id]" >View Location</a>
      <a [routerLink]="['/mapActual']">Mostrar tu ubicacion</a>
    </section>
  `,
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {

  @Input() housingLocation!: Housinglocation;

}
