import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DetailsComponent} from "./details/details.component";
import {MapComponent} from "./map/map.component";
import {ActualMapComponent} from "./actual-map/actual-map.component";
export const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: 'map/:id',
    component: MapComponent,
    title: 'Map details'
  },
  {
    path: 'mapActual',
    component: ActualMapComponent,
    title: 'Current location'
  }
];


