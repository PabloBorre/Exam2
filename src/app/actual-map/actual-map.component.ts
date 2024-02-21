import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UbicacionActualService} from "../ubicacionActual.service";


@Component({
  selector: 'app-actual-map',
  standalone: true,
  imports: [],
  templateUrl: './actual-map.component.html',
  styleUrl: './actual-map.component.css'
})
export class ActualMapComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  ubicaionActual = inject(UbicacionActualService);
  constructor() {};

  ngOnInit(): void {
    this.ubicaionActual.showYourLocation()
  }
}
