import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ConfigurationItem } from '../../../../../models/configuration-item';
import { FrameType } from '../models/frame-type';

@Injectable({
  providedIn: 'root'
})
export class PalmsCraneConfigService {
  //private url = 'http://localhost:5140';
  private url = 'https://calculator-app-api.azurewebsites.net';

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

  getControlBlocksByCraneFrameType(craneId: number, frameTypeId: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsCraneConfig/cranes/${craneId}/${frameTypeId}/controlblocks`).pipe(
      map((controlBlocks: ConfigurationItem[]) => {
        for (const controlBlock of controlBlocks){
          controlBlock.namePrice = controlBlock.name + " " + controlBlock.price + "€"
          controlBlock.imgUrl = `../../../../../../assets/PALMS crane-controlblock-${controlBlock.id}.svg`;
        }
        return controlBlocks;
      })
    );
  }

  getRotators(id: number): Observable<FrameType[]>{
    return this.httpClient.get<FrameType[]>(`${this.url}/PalmsCraneConfig/cranes/${id}/rotators`).pipe(
      map((rotators: FrameType[]) => {
        for (const rotator of rotators){
          rotator.namePrice = rotator.name + " " + rotator.price + "€"
          rotator.imgUrls = [`../../../../../../assets/PALMS crane-rotator-${rotator.id}.svg`, `../../../../../../assets/PALMS crane-rotator-${rotator.id}-1.jpg`]
        }
        return rotators;
      })
    );
  }

  getGrapples(id: number): Observable<FrameType[]>{
    return this.httpClient.get<FrameType[]>(`${this.url}/PalmsCraneConfig/cranes/${id}/grapples`).pipe(
      map((grapples: FrameType[]) => {
        for (const grapple of grapples){
          grapple.namePrice = grapple.name + " " + grapple.price + "€"
          grapple.imgUrls = [`../../../../../../assets/PALMS crane-grapple-${grapple.id}.svg`, `../../../../../../assets/PALMS crane-grapple-${grapple.id}-1.jpg`]
        }
        return grapples;
      })
    );
  }
}
