import {RouterLink, Routes} from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from "rxjs";
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HomeComponent,
    CommonModule,
    ReactiveFormsModule, RouterLink],
  template: `
    <article *ngIf="housingLocation | async as housingLocation">
      <img class="listing-photo" [src]="housingLocation?.photo"
           alt="Exterior photo of {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
          <li>Valoration: {{housingLocation?.valoration}}</li>
          <li>
            <form [formGroup]="applyForm" (ngSubmit)="valoration()">
              <input type="number" formControlName="valoration"  >
              <button type="submit" class="primary" (change)="housingLocation.valoration">Save your valoration</button>
            </form>
          </li>

          <li *ngIf="housingLocation.valoration < 5">
            <img id="fotos" src="../../assets/bad.png" alt="bad" aria-hidden="true">
          </li>
          <li *ngIf="housingLocation.valoration >= 5 && housingLocation.valoration<= 7" >
            <img id="fotos" src="../../assets/good.jpg" alt="god" aria-hidden="true">
          </li>
          <li *ngIf="housingLocation.valoration >7 && housingLocation.valoration <= 10 ">
            <img id="fotos" src="../../assets/excelent.png" alt="excelent" aria-hidden="true">
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication() ">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" >

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: Observable<Housinglocation | undefined>;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    valoration: new FormControl('', [Validators.max(10), Validators.min(0)])
  });
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation = this.housingService.getHouseingLocationById(housingLocationId);
    };

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

  valoration(){
    this.housingLocation.subscribe(e => {
      if (e && this.applyForm.value.valoration){
        e.valoration = Number(e.valoration + this.applyForm.value.valoration)/2;
        console.log(e.valoration)
        //Se guarda en la propiedad pero no consigo mostrarlo al hacer el submit
        this.applyForm.reset()
      }
    })
  }

}

