import { SliderChangeEvent, SliderModule, SliderSlideEndEvent } from 'primeng/slider';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { PalmsCraneOverview } from '../../models/palms-crane-overview';
import { LoadingService } from '../../../../../../services/loading.service';
import { PalmsService } from '../../../shared/services/palms.service';
import { Router } from '@angular/router';
import { PalmsCranesCardsComponent } from "../palms-cranes-cards/palms-crane-cards.component";

@Component({
    selector: 'app-palms-cranes',
    standalone: true,
    templateUrl: './palms-cranes.component.html',
    styleUrl: './palms-cranes.component.css',
    imports: [FormsModule, CardModule, SliderModule, PalmsCranesCardsComponent]
})
export class PalmsCranesComponent {
  originalCranes: PalmsCraneOverview[] = []
  cranes: PalmsCraneOverview[] = [];
  rangeValues: number[] = [4.2, 10.1];
  min: number = 4.2
  max: number = 10.1

  constructor(
    readonly palmsService: PalmsService,
    readonly loadingService: LoadingService,
    readonly router: Router){}

  navigateToCrane(craneId: number) {
    this.router.navigate(['/calculator/palms/cranes', craneId]);
  }
  
  
  ngOnInit(): void {
    this.loadingService.enableLoader();
    this.palmsService.getCranes().subscribe((resp) => {
      this.cranes = resp as PalmsCraneOverview[];
      this.originalCranes = resp as PalmsCraneOverview[]
    }).add(() => this.loadingService.disableLoader())

    // this.palmsService.selectedChassisType$.pipe().subscribe((chassisType) => {

    //   this.filterCranes();
    // })
  }

  filterCranes(event: SliderSlideEndEvent) {
    if (event.values && event.values.length === 2) {
        const minMaxRange = event.values.map(value => parseFloat(value.toString()));
        const min = Math.min(...minMaxRange);
        const max = Math.max(...minMaxRange);
        console.log(min);
        console.log(max);
        
        
        console.log(minMaxRange);
        console.log('original cranes', this.originalCranes);
        
        this.cranes = this.originalCranes.filter(crane => {
            const maxReach = parseFloat(crane.maxReach as string);
            console.log(maxReach);
            
            return !isNaN(maxReach) && maxReach >= min && maxReach <= max;
        });
        console.log('cranes after', this.cranes);
        
    } else {
        console.error("Invalid values provided in the event.");
    }
  }
}
