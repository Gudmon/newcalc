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

}
