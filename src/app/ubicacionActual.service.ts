import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class UbicacionActualService {

  constructor() { }

  showLocation(latitude: number, longitude: number){

    const map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([latitude, longitude]).addTo(map)
      .bindPopup('Current house location')
      .openPopup();
  }

  showYourLocation(){
    navigator.geolocation.getCurrentPosition(position => {
      this.showLocation(position.coords.latitude, position.coords.longitude);
    })
  }
}
