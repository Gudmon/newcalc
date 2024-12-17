import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PalmsTrailer } from '../trailers/models/palms-trailer';
import { PalmsCrane } from '../cranes/models/palms-crane';
import { ComparisonStoreService } from '../trailers/services/comparison-store.service';
import { PalmsService } from '../shared/services/palms.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [TableModule, NgFor],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.css'
})
export class ComparisonComponent implements OnInit {
  vehicles: (PalmsTrailer | PalmsCrane)[] = [];

  vehicleProperties: any[] = [];
  
  constructor(private readonly comparisonStoreService: ComparisonStoreService,
    private readonly palmsService: PalmsService
  ){}

  ngOnInit() {
    this.comparisonStoreService.selectedVehicles$.subscribe((vehicles) => {
      if(vehicles.find((vehicle) => 'loadingAreaLength' in vehicle)){
        this.vehicleProperties = [
          { label: 'Rakfelület mérete (m2)', key: 'loadingAreaCross' },
          { label: 'Rakfelület hossza (mm)', key: 'loadingAreaLength' },
          { label: 'Raktérhosszabbítás', key: 'frameExtensionLength' },
          { label: 'Teljes tömeg (kg)', key: 'grossWeight' },
          { label: 'Saját tömeg (kg)', key: 'curbWeight' },
          { label: 'Teljes hossz (mm)', key: 'totalLength' },
          { label: 'Szélesség standard kerekekkel (mm)', key: 'widthWithStandardWheels' },
          { label: 'Standard kerékméret (mm)', key: 'standardWheelSize' },
          { label: 'Alváz mérete (mm)', key: 'frame' },
          { label: 'Maximális daruméret bruttó emelési nyomatéka (kNm)', key: 'maxCraneSize' },
          { label: 'Vonórúd kormány munkahenger száma (db)', key: 'drawbarControlCylinders' },
          { label: 'Alváz típusa', key: 'beamType' }
        ]
      }else {
        this.vehicleProperties = [
          { label: 'Széria', key: 'series' },
          { label: 'Teljes kinyúlás (m)', key: 'maxReach' },
          { label: 'Emelési kapacitás teljes kinyúlásnál 240 Bar-on (kg)', key: 'liftAtFullReach240Bar' },
          { label: 'Emelési kapacitás teljes kinyúlásnál 215 Bar-on (kg)', key: 'liftAtFullReach215Bar' },
          { label: 'Emelési kapacitás teljes kinyúlásnál 190 Bar-on (kg)', key: 'liftAtFullReach190Bar' },
          { label: 'Emelési kapacitás 4 méteren 240 Bar-on (kg)', key: 'liftAtFourMeters240Bar' },
          { label: 'Emelési kapacitás 4 méteren 215 Bar-on (kg)', key: 'liftAtFourMeters215Bar' },
          { label: 'Emelési kapacitás 4 méteren 190 Bar-on (kg)', key: 'liftAtFourMeters190Bar' },
          { label: 'Bruttó emelési erő 240 Bar-on (kNm)', key: 'brutLiftingTorque240Bar' },
          { label: 'Bruttó emelési erő 215 Bar-on (kNm)', key: 'brutLiftingTorque215Bar' },
          { label: 'Bruttó emelési erő 190 Bar-on (kNm)', key: 'brutLiftingTorque190Bar' },
          { label: 'Teleszkóp hossza (m)', key: 'telescopeLength' },
          { label: 'Forgató munkahengerek száma (db)', key: 'slewingCylinder' },
          { label: 'Forgatási erő (kNm)', key: 'slewingTorque' },
          { label: 'Üzemi nyomás (bar)', key: 'workingPressure' },
          { label: 'Rotátor maximum terhelhetősége (kN)', key: 'rotatorMaximumLoad' },
          { label: 'Rotátor típusa', key: 'rotatorType' },
          { label: 'Rotátor csatlakozás', key: 'rotatorConnection' },
          { label: 'Daru súlya támasztó lábak nélkül (kg)', key: 'craneWeight' },
          { label: 'Fordulási szög (°)', key: 'pillarSlewingAngle' },
          { label: 'Ajánlott olajáramlás (l/perc)', key: 'recommendedOilFlow' }
        ]
      }

      this.vehicles = vehicles;
    })
  }

  // addTrailer(num: number){
  //   this.palmsService.getTrailer(num).subscribe((trailer) => {
  //     console.log(trailer);
      
  //     this.comparisonStoreService.addVehicle(trailer);
  //   });
  // }

  // addCrane(num: number){
  //   this.palmsService.getCrane(num).subscribe((crane) => {
  //     console.log(crane);
      
  //     this.comparisonStoreService.addVehicle(crane);
  //   });
  // }
}