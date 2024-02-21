import { Injectable } from '@angular/core';
import {Housinglocation} from "./housinglocation";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  constructor(private http : HttpClient) { }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }

  /*async getAllHousingLocations(): Promise<Housinglocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<Housinglocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }*/

  getListHouses() : Observable<Housinglocation[]>{
    return this.http.get<Housinglocation[]>(`assets/db.json`)
  }

  getHouseingLocationById(id : number) : Observable<Housinglocation | undefined> {
    return this.getListHouses().pipe(
      map(house => house.find(house => house.id === id))
    );
  }
}
