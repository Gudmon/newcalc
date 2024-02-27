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
  //private url = 'https://calculator-app-api.azurewebsites.net';

  constructor(private httpClient: HttpClient) { }

  getFrameTypesForTrailerCrane(trailerId: number, craneId: number): Observable<ConfigurationItem[]> {
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsCraneConfig/${trailerId}/cranes/${craneId}/availableFrameTypes`);
  }

  getControlBlocks(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsCraneConfig/cranes/${id}/controlblocks`).pipe(
      map((controlBlocks: ConfigurationItem[]) => {
        for (const controlBlock of controlBlocks){
          controlBlock.disabledOption = false;
          controlBlock.namePrice = controlBlock.name + " " + controlBlock.price + "€"
          controlBlock.imgUrl = `../../../../../../assets/PALMS crane-controlblock-${controlBlock.id}.jpg`;
        }
        return controlBlocks;
      })
    );
  }

  getFrameTypes(id: number): Observable<FrameType[]>{
    return this.httpClient.get<FrameType[]>(`${this.url}/PalmsCraneConfig/cranes/${id}/frametypes`).pipe(
      map((frameTypes: FrameType[]) => {
        for (const frameType of frameTypes){  
          frameType.disabledOption = false;
          frameType.namePrice = frameType.name + " " + frameType.price + "€"

          if (frameType.id === 6 || frameType.id === 9){       
            frameType.imgUrl = `../../../../../../assets/PALMS crane-frametype-${frameType.id}.svg`
          } 
          else if (frameType.id === 8){
            frameType.imgUrls = [`../../../../../../assets/PALMS crane-frametype-${frameType.id}.jpg`, `../../../../../../assets/PALMS crane-frametype-${frameType.id}-1.jpg`] 
          }
          else {
            frameType.imgUrls = [`../../../../../../assets/PALMS crane-frametype-${frameType.id}.svg`, `../../../../../../assets/PALMS crane-frametype-${frameType.id}-1.jpg`] 
          }

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

  getRotators(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsCraneConfig/cranes/${id}/rotators`).pipe(
      map((rotators: ConfigurationItem[]) => {
        for (const rotator of rotators){
          rotator.disabledOption = false;
          rotator.namePrice = rotator.name + " " + rotator.price + "€"
          rotator.imgUrls = [`../../../../../../assets/PALMS crane-rotator-${rotator.id}.svg`, `../../../../../../assets/PALMS crane-rotator-${rotator.id}-1.jpg`]
        }
        return rotators;
      })
    );
  }

  getGrapples(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsCraneConfig/cranes/${id}/grapples`).pipe(
      map((grapples: ConfigurationItem[]) => {
        for (const grapple of grapples){
          grapple.disabledOption = false;
          grapple.namePrice = grapple.name + " " + grapple.price + "€"
          grapple.imgUrl = `../../../../../../assets/PALMS crane-grapple-${grapple.id}.jpg`;
        }
        return grapples;
      })
    );
  }

  getWinches(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsCraneConfig/cranes/${id}/winches`).pipe(
      map((winches: ConfigurationItem[]) => {
        for (const winch of winches){
          winch.disabledOption = false;
          winch.namePrice = winch.name + " " + winch.price + "€"
          winch.imgUrl = `../../../../../../assets/PALMS crane-grapple-${winch.id}.jpg`;
        }
        return winches;
      })
    );
  }

  getProtectionSleeves(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/PalmsCraneConfig/cranes/${id}/protectionsleeves`).pipe(
      map((protectionSleeves: ConfigurationItem | null) => {
        if (protectionSleeves) {
          protectionSleeves.namePrice = protectionSleeves.name + " " + protectionSleeves.price + "€";
          return protectionSleeves;
        } else {
          return null;
        }
      })
    );
  }

  getElectricalFloating(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/PalmsCraneConfig/cranes/${id}/electricalfloating`).pipe(
      map((electricalFloating: ConfigurationItem | null) => {
        if (electricalFloating) {
          electricalFloating.namePrice = electricalFloating.name + " " + electricalFloating.price + "€";
          return electricalFloating;
        } else {
          return null;
        }
      })
    );
  }
}
