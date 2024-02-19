import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PalmsCraneConfigService {
  private url = 'http://localhost:5140';

  constructor(private httpClient: HttpClient) { }

  getRecommendedCraneFrameTypes(trailerId: number, craneId: number){
    this.httpClient.get(`${this.url}/PalmsTrailerConfig/${trailerId}/cranes/${craneId}/availableFrameTypes`)
    .pipe()
    .subscribe((resp) => console.log(resp));
  }
}
