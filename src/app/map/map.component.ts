import {Component, inject, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {HomeComponent} from "../home/home.component";
import {CommonModule, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HousingService} from "../housing.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Housinglocation} from "../housinglocation";
import {WeatherService} from "../weather.service";


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HomeComponent,
    CommonModule,
    ReactiveFormsModule,
    NgIf],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: Observable<Housinglocation | undefined>;
  weatherService = inject(WeatherService)
  weatherData: any;
  housingName: any;

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHouseingLocationById(housingLocationId);
  };

  ngOnInit() {
    this.housingLocation.subscribe(housingLocation => {

      if (housingLocation) {
        const map = L.map('map').setView([housingLocation.latitude, housingLocation.longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        L.marker([housingLocation.latitude, housingLocation.longitude]).addTo(map)
          .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
          .openPopup();

        this.housingName = housingLocation.city;
      }
      if (housingLocation) {
        this.weatherService.getWeather(housingLocation.city)
        {
          this.weatherService.getWeather(housingLocation.city).subscribe((data) => {
            this.weatherData = data;
            this.weatherData.condition.icon
          });
        }
      }

    })


  }
}

