import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { PalmsTrailerOverview } from '../models/palms-trailer-overview';
import { PalmsTrailer } from '../models/palms-trailer';
@Injectable({
  providedIn: 'root'
})
export class PalmsService {
  private url = 'http://localhost:5140';

  public _selectedMachineType = new BehaviorSubject<number | null>(null);
  public selectedMachineType$ = this._selectedMachineType.asObservable();

  public _selectedChassisType = new BehaviorSubject<number | null>(null);
  public selectedChassisType$ = this._selectedChassisType.asObservable();

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

  getTrailer(id: string): Observable<PalmsTrailer>{
    return this.httpClient.get<PalmsTrailer>(`${this.url}/Palms/trailers/${id}`).pipe(
      map((trailer: PalmsTrailer) => {
        trailer.imgUrl = [`../../../../../assets/${trailer.name}-1.svg`, `../../../../../assets/${trailer.name}-2.svg`, `../../../../../assets/${trailer.name}-3.jpg`]
        return trailer;
      })
  
    );
  }

  getCranes(){
    return this.httpClient.get(`${this.url}/Palms/cranes`);
  }

  getCrane(id: string){
    return this.httpClient.get(`${this.url}/Palms/cranes/${id}`);
  }
}
