import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '809a37f3a58a45639bd184429241602';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`;
    return this.http.get(url);
  }
}
