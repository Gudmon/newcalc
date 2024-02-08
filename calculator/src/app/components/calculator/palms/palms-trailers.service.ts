import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PalmsTrailersService {
  private url = 'http://localhost:5140';

  constructor(private httpClient: HttpClient) { }
  
  getTrailers(){
    return this.httpClient.get(`${this.url}/WeatherForecast`);
  }
}
