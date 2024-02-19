import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ConfigItem } from '../../../../../../models/config-item';
import { PalmsService } from '../../../shared/services/palms.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { Router } from '@angular/router';
import { PalmsTrailerOverview } from '../../models/palms-trailer-overview';
import { LoadingService } from '../../../../../../services/loading.service';

@Component({
    selector: 'app-palms-trailers',
    standalone: true,
    templateUrl: './palms-trailers.component.html',
    styleUrl: './palms-trailers.component.css',
    imports: [FormsModule, CommonModule, CardModule, FormatPricePipe]
})

export class PalmsTrailersComponent implements OnInit {
  constructor(
    readonly palmsService: PalmsService,
    readonly loadingService: LoadingService,
    readonly router: Router){}

  navigateToTrailer(trailerId: number) {
    this.router.navigate(['/calculator/palms', trailerId]);
  }
  
  originalTrailers: PalmsTrailerOverview[] = []
  trailers: PalmsTrailerOverview[] = [];

  ngOnInit(): void {
    this.loadingService.enableLoader();
    this.palmsService.getTrailers().subscribe((resp) => {
      this.trailers = resp as PalmsTrailerOverview[];
      this.originalTrailers = resp as PalmsTrailerOverview[]
    }).add(() => this.loadingService.disableLoader())

    this.palmsService.selectedChassisType$.pipe().subscribe((chassisType) => {

      this.filterTrailers(chassisType!);
    })
  }

  filterTrailers(chassisType: number) {
    if (chassisType === 1) {
        this.trailers = this.originalTrailers.filter(trailer => trailer.beamType === "Egy");
    } else if (chassisType === 2) {
        this.trailers = this.originalTrailers.filter(trailer => trailer.beamType === "Dupla");
    } else if (chassisType === 3) {
        this.trailers = this.originalTrailers.filter(trailer => trailer.beamType === "Unibody");
    } else {
      this.trailers = this.originalTrailers;
    }
  } 
}
