import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ConfigurationItem } from '../../../../models/configuration-item';

@Injectable({
  providedIn: 'root'
})
export class PalmsTrailerConfigService {
  private url = 'http://localhost:5140';
  
  constructor(private httpClient: HttpClient) { }

  getStanchions(id: string): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/stanchions`).pipe(
      map((stanchions: ConfigurationItem[]) => {
        for (const stanchion of stanchions){
          stanchion.namePrice = stanchion.name + " " + stanchion.price + "€"
        }
        return stanchions;
      })
    );
  }

  getBrakes(id: string): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/brakes`).pipe(
      map((brakes: ConfigurationItem[]) => {
        for (const brake of brakes){
          brake.namePrice = brake.name + " " + brake.price + "€"
          brake.imgUrl = `../../../../assets/PALMS trailer-brake-${Number(brake.id) - 1}.jpg`
        }
        console.log(brakes);
        
        return brakes;
      })
    );
  }

  getPropulsions(id: string): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/propulsions`).pipe(
      map((propulsions: ConfigurationItem[]) => {
        for (const propulsion of propulsions){
          propulsion.namePrice = propulsion.name + " " + propulsion.price + "€"
        }
        return propulsions;
      })
    );
  }

  getDrawbars(id: string): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/drawbars`).pipe(
      map((drawbars: ConfigurationItem[]) => {
        for (const drawbar of drawbars){
          drawbar.namePrice = drawbar.name + " " + drawbar.price + "€"
          drawbar.imgUrl = `../../../../assets/PALMS trailer-drawbar-${drawbar.id}.jpg`
        }
        return drawbars;
      })
    );
  }

  getPlatforms(id: string): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/platforms`).pipe(
      map((platforms: ConfigurationItem[]) => {
        for (const platform of platforms){
          platform.namePrice = platform.name + " " + platform.price + "€"
          platform.imgUrl = `../../../../assets/PALMS trailer-drawbar-${platform.id}.jpg`
        }
        return platforms;
      })
    );
  }

  getOilPumps(id: string): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/oilpumps`).pipe(
      map((oilpumps: ConfigurationItem[]) => {
        for (const oilpump of oilpumps){
          oilpump.namePrice = oilpump.name + " " + oilpump.price + "€"
          oilpump.imgUrl = `../../../../assets/PALMS trailer-drawbar-${oilpump.id}.jpg`
        }
        return oilpumps;
      })
    );
  }

  getOilTanks(id: string): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/oiltanks`).pipe(
      map((oiltanks: ConfigurationItem[]) => {
        for (const oiltank of oiltanks){
          oiltank.namePrice = oiltank.name + " " + oiltank.price + "€"
          oiltank.imgUrl = `../../../../assets/PALMS trailer-drawbar-${oiltank.id}.jpg`
        }
        return oiltanks;
      })
    );
  }
}
