import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ConfigurationItem } from '../../../../../models/configuration-item';
import { FrameType } from '../models/frame-type';

@Injectable({
  providedIn: 'root'
})
export class PalmsCraneConfigService {
  private url = 'http://localhost:5140';

  constructor(private httpClient: HttpClient) { }

  getFrameTypesForTrailerCrane(trailerId: number, craneId: number): Observable<ConfigurationItem[]> {
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsCraneConfig/${trailerId}/cranes/${craneId}/availableFrameTypes`);
  }

  getFrameTypes(id: number): Observable<FrameType[]>{
    return this.httpClient.get<FrameType[]>(`${this.url}/PalmsCraneConfig/cranes/${id}/frametypes`).pipe(
      map((frameTypes: FrameType[]) => {
        for (const frameType of frameTypes){
          frameType.namePrice = frameType.name + " " + frameType.price + "€"
          frameType.imgUrls = [`../../../../../../assets/PALMS crane-frametype-${frameType.id}.svg`, `../../../../../../assets/PALMS crane-frametype-${frameType.id}-1.jpg`]
        }
        return frameTypes;
      })
    );
  }

}
