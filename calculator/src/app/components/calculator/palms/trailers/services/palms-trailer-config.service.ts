import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { ConfigurationItem } from '../../../../../models/configuration-item';

@Injectable({
  providedIn: 'root'
})
export class PalmsTrailerConfigService {
  //private url = 'http://localhost:5140';
  private url = 'https://calculator-app-api.azurewebsites.net';
  
  constructor(private httpClient: HttpClient) { }

  getStanchions(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/stanchions`).pipe(
      map((stanchions: ConfigurationItem[]) => {
        for (const stanchion of stanchions){
          stanchion.namePrice = stanchion.name + " " + stanchion.price + "€"
        }
        return stanchions;
      })
    );
  }

  getBrakes(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/brakes`).pipe(
      map((brakes: ConfigurationItem[]) => {
        for (const brake of brakes){
          brake.namePrice = brake.name + " " + brake.price + "€"
          if(brake.code === "B1") brake.imgUrl = `../../../../assets/PALMS trailer-brake-1.jpg`
          if(brake.code === "B2") brake.imgUrl = `../../../../assets/PALMS trailer-brake-2.jpg`
          if(brake.code === "B3") brake.imgUrl = `../../../../assets/PALMS trailer-brake-3.jpg`
          if(brake.code === "B4") brake.imgUrl = `../../../../assets/PALMS trailer-brake-4.jpg`
          
        }    
        return brakes;
      })
    );
  }

  getPropulsions(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/propulsions`).pipe(
      map((propulsions: ConfigurationItem[]) => {
        
        for (const propulsion of propulsions){
          if (propulsion.code === "RWD") propulsion.imgUrls = [`../../../../assets/PALMS trailer-propulsion-1.jpg`, `../../../../assets/PALMS trailer-propulsion-1-1.jpg`]
          else if (propulsion.code === "RWD+") propulsion.imgUrls = [`../../../../assets/PALMS trailer-propulsion-2.jpg`, `../../../../assets/PALMS trailer-propulsion-2-1.jpg`, `../../../../assets/PALMS trailer-propulsion-2-2.jpg`]
          else if (propulsion.code === "45WDB" || propulsion.code === "45WDB.1" ) propulsion.imgUrls = [`../../../../assets/PALMS trailer-propulsion-5.jpg`]
          else propulsion.imgUrls = [`../../../../assets/PALMS trailer-propulsion-${propulsion.id}.jpg`]
          propulsion.namePrice = propulsion.name + " " + propulsion.price + "€"
        }
        return propulsions;
      })
    );
  }

  getDrawbars(id: number): Observable<ConfigurationItem[]>{
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

  getPlatforms(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/platforms`).pipe(
      map((platforms: ConfigurationItem[]) => {
        for (const platform of platforms){
          platform.namePrice = platform.name + " " + platform.price + "€"
          if (Number(platform.id) === 1) {
            platform.imgUrls = [`../../../../assets/PALMS trailer-platform-1.jpg`, `../../../../assets/PALMS trailer-platform-2.jpg`]
          }
          platform.imgUrl = `../../../../assets/PALMS trailer-platform-${platform.id}.jpg`
        }
        return platforms;
      })
    );
  }

  getOilPumps(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/oilpumps`).pipe(
      map((oilpumps: ConfigurationItem[]) => {
        for (const oilpump of oilpumps){
          oilpump.namePrice = oilpump.name + " " + oilpump.price + "€"
          if (Number(oilpump.id) === 1) {
            oilpump.imgUrl = `../../../../assets/PALMS trailer-pump-adapter-1.jpg`
          }
        }
        return oilpumps;
      })
    );
  }

  getOilTanks(id: number): Observable<ConfigurationItem[]>{
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

  getTrailerOilCooler(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/PalmsTrailerConfig/trailers/${id}/oilcooler`).pipe(
      map((oilCooler: ConfigurationItem | null) => {
        if (oilCooler) {
          oilCooler.namePrice = oilCooler.name + " " + oilCooler.price + "€";
          return oilCooler;
        } else {
          return null;
        }
      })
    );
  }

  getBolsterLock(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/PalmsTrailerConfig/trailers/${id}/bolsterlock`).pipe(
      map((bolsterLock: ConfigurationItem | null) => {
        if (bolsterLock) {
          bolsterLock.namePrice = bolsterLock.name + " " + bolsterLock.price + "€";
          return bolsterLock;
        } else {
          return null;
        }
      })
    );
  }

  getBBox(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/PalmsTrailerConfig/trailers/${id}/bbox`).pipe(
      map((bbox: ConfigurationItem | null) => {
        if (bbox) {
          bbox.namePrice = bbox.name + " " + bbox.price + "€";
          return bbox;
        } else {
          return null;
        }
      })
    );
  }

  getWoodSorter(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/PalmsTrailerConfig/trailers/${id}/woodsorter`).pipe(
      map((woodSorter: ConfigurationItem | null) => {
        if (woodSorter) {
          woodSorter.namePrice = woodSorter.name + " " + woodSorter.price + "€";
          return woodSorter;
        } else {
          return null;
        }
      })
    );
  }

  getHandBrake(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/PalmsTrailerConfig/trailers/${id}/handbrake`).pipe(
      map((handBrake: ConfigurationItem | null) => {
        if (handBrake) {
          handBrake.namePrice = handBrake.name + " " + handBrake.price + "€";
          return handBrake;
        } else {
          return null;
        }
      })
    );
  }

  getChainsawHolder(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/PalmsTrailerConfig/trailers/${id}/chainsawholder`).pipe(
      map((chainsawHolder: ConfigurationItem | null) => {
        if (chainsawHolder) {
          chainsawHolder.namePrice = chainsawHolder.name + " " + chainsawHolder.price + "€";
          return chainsawHolder;
        } else {
          return null;
        }
      })
    );
  }

  getUnderrunProtection(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/PalmsTrailerConfig/trailers/${id}/underrunprotection`).pipe(
      map((underrunProtection: ConfigurationItem | null) => {
        if (underrunProtection) {
          underrunProtection.namePrice = underrunProtection.name + " " + underrunProtection.price + "€";
          return underrunProtection;
        } else {
          return null;
        }
      })
    );
  }

  getSupportLegs(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/supportlegs`).pipe(
      map((supportLegs: ConfigurationItem[]) => {
        for (const supportLeg of supportLegs){
          supportLeg.namePrice = supportLeg.name + " " + supportLeg.price + "€"
          if(Number(supportLeg.id) === 1) {
            supportLeg.imgUrl = `../../../../assets/PALMS trailer-support-leg-2.jpg`
          }
          else {
            supportLeg.imgUrl = `../../../../assets/PALMS trailer-support-leg-${supportLeg.id}.jpg`         
          }
        }
        return supportLegs;
      })
    );
  }

  getLights(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/lights`).pipe(
      map((lights: ConfigurationItem[]) => {
        for (const light of lights){
          light.namePrice = light.name + " " + light.price + "€"
          light.imgUrls = [`../../../../assets/PALMS trailer-light-${light.id}.jpg`, `../../../../assets/PALMS trailer-light-${light.id}-1.jpg`]         
        }
        return lights;
      })
    );
  }

  getTyres(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/PalmsTrailerConfig/trailers/${id}/tyres`).pipe(
      map((tyres: ConfigurationItem[]) => {
        for (const tyre of tyres){
          if (tyre.price.toString() === '0'){
            tyre.namePrice = tyre.name
          } else {
            tyre.namePrice = tyre.name + " " + tyre.price + "€";
          }
        }
        return tyres;
      })
    );
  }

  getBunkAdapter(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/PalmsTrailerConfig/trailers/${id}/bunkadapter`).pipe(
      map((bunkAdapter: ConfigurationItem | null) => {
        if (bunkAdapter) {
          bunkAdapter.namePrice = bunkAdapter.name + " " + bunkAdapter.price + "€";
          return bunkAdapter;
        } else {
          return null;
        }
      })
    );
  }

  getBunkExtension(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/PalmsTrailerConfig/trailers/${id}/bunkextension`).pipe(
      map((bunkExtension: ConfigurationItem | null) => {
        if (bunkExtension) {
          bunkExtension.namePrice = bunkExtension.name + " " + bunkExtension.price + "€";
          return bunkExtension;
        } else {
          return null;
        }
      })
    );
  }

  getFrameExtension(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/PalmsTrailerConfig/trailers/${id}/frameextension`).pipe(
      map((frameExtension: ConfigurationItem | null) => {
        if (frameExtension) {
          frameExtension.namePrice = frameExtension.name + " " + frameExtension.price + "€";
          return frameExtension;
        } else {
          return null;
        }
      })
    );
  }
}
