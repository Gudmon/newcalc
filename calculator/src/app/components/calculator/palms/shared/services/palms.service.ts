import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { PalmsTrailerOverview } from '../../trailers/models/palms-trailer-overview';
import { PalmsTrailer } from '../../trailers/models/palms-trailer';
import { PalmsCraneOverview } from '../../cranes/models/palms-crane-overview';
import { PalmsCrane } from '../../cranes/models/palms-crane';
@Injectable({
  providedIn: 'root'
})
export class PalmsService {
  //private url = 'http://localhost:5140';
  private url = 'https://calculator-app-api.azurewebsites.net';

  public _selectedMachineType = new BehaviorSubject<number | null>(null);
  public selectedMachineType$ = this._selectedMachineType.asObservable();

  public _selectedChassisType = new BehaviorSubject<number | null>(null);
  public selectedChassisType$ = this._selectedChassisType.asObservable();

  public _trailerPrice = signal(0);
  public _cranePrice = signal(0);

  constructor(private httpClient: HttpClient) { }
  
  getTrailers(): Observable<PalmsTrailerOverview[]> {
    return this.httpClient.get<PalmsTrailerOverview[]>(`${this.url}/Palms/trailers`).pipe(
        map((trailerOvewViews: PalmsTrailerOverview[]) => {
            for (const trailerOvewView of trailerOvewViews) {
              trailerOvewView.imgUrl = `../../../../../assets/${trailerOvewView.name}-1.svg`;
            }
            return trailerOvewViews;
        })
    );
}

  getTrailer(id: number): Observable<PalmsTrailer>{
    return this.httpClient.get<PalmsTrailer>(`${this.url}/Palms/trailers/${id}`).pipe(
      map((trailer: PalmsTrailer) => {
        trailer.imgUrls = [`../../../../../assets/${trailer.name}-1.svg`, `../../../../../assets/${trailer.name}-2.jpg`]
        for (const crane of trailer.crane){
          crane.imgUrl = `../../../../../assets/${crane.name}-1.svg`
        }
        return trailer;
      })
  
    );
  }

  getCranes(): Observable<PalmsCraneOverview[]>{
    return this.httpClient.get<PalmsCraneOverview[]>(`${this.url}/Palms/cranes`).pipe(
      map((craneOverViews: PalmsCraneOverview[]) => {
        for (const craneOverView of craneOverViews) {
          craneOverView.imgUrl = `../../../../../assets/${craneOverView.name}-1.svg`;
        }
        return craneOverViews;
      })
    );
  }

  getCrane(id: number): Observable<PalmsCrane>{
    return this.httpClient.get<PalmsCrane>(`${this.url}/Palms/cranes/${id}`).pipe(
      map((crane: PalmsCrane) => {
        crane.imgUrls = [`../../../../../assets/${crane.name}-1.svg`, `../../../../../assets/${crane.name}-2.jpg`]
        for (const trailer of crane.trailer){
          trailer.imgUrl = `../../../../../assets/${trailer.name}-1.svg`
        }
        return crane;
      })
    );
  }
}
