import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PalmsTrailer } from '../models/palms-trailer';
import { PalmsCrane } from '../../cranes/models/palms-crane';

@Injectable({
  providedIn: 'root'
})
export class ComparisonStoreService {
  private readonly _selectedVehicles = new BehaviorSubject<(PalmsCrane | PalmsTrailer)[]>([]);
  public selectedVehicles$ = this._selectedVehicles.asObservable();

  setVehicles(vehicles: PalmsCrane[] | PalmsTrailer[]){
    this._selectedVehicles.next(vehicles);
  }
  
  addVehicle(vehicle: PalmsCrane | PalmsTrailer) {
    const currentVehicles = this._selectedVehicles.getValue();
  
    const hasTrailers = currentVehicles.some(v => this.isTrailer(v));
    const hasCranes = currentVehicles.some(v => this.isCrane(v));
  
    const isIncomingTrailer = this.isTrailer(vehicle);
    const isIncomingCrane = this.isCrane(vehicle);
    if ((isIncomingTrailer && hasCranes) || (isIncomingCrane && hasTrailers)) {
      this._selectedVehicles.next([vehicle]);
      return;
    }
  
    const exists = currentVehicles.some(v => v.id === vehicle.id);
    if (!exists) {
      this._selectedVehicles.next([...currentVehicles, vehicle]);
    }
  }

  removeVehicle(vehicle: PalmsCrane | PalmsTrailer){
    const currentVehicles = this._selectedVehicles.getValue();
    const newVehicles = currentVehicles.filter((v) => v.id !== vehicle.id)

    this._selectedVehicles.next(newVehicles);

  }

  clear(){
    this._selectedVehicles.next([]);
  }
  
  private isTrailer(vehicle: PalmsCrane | PalmsTrailer): vehicle is PalmsTrailer {
    return 'loadingAreaLength' in vehicle;
  }
  
  private isCrane(vehicle: PalmsCrane | PalmsTrailer): vehicle is PalmsCrane {
    return 'maxReach' in vehicle;
  }
}
