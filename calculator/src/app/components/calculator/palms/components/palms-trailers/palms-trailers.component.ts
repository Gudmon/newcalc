import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ConfigItem } from '../../../../../models/config-item';
import { PalmsService } from '../../services/palms.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormatPricePipe } from "../../../../pipes/format-price.pipe";
import { PalmsTrailer } from '../../models/palms-trailer';
import { Router } from '@angular/router';
import { PalmsTrailerOverview } from '../../models/palms-trailer-overview';

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
    readonly router: Router){}

  navigateToTrailer(trailerId: number) {
    this.router.navigate(['/calculator/palms', trailerId]);
  }
  
  originalTrailers: PalmsTrailerOverview[] = []
  trailers: PalmsTrailerOverview[] = [];

  ngOnInit(): void {
    this.palmsService.getTrailers().subscribe((resp) => {
      console.log(resp);
      this.trailers = resp as PalmsTrailerOverview[];
      this.originalTrailers = resp as PalmsTrailerOverview[]
    })

    this.palmsService.selectedChassisType$.pipe().subscribe((chassisType) => {
      console.log('on init', chassisType);
      this.filterTrailers(chassisType!);
    })
  }

  filterTrailers(chassisType: number) {
    if (chassisType === 1) {
        this.trailers = this.originalTrailers.filter(trailer => trailer.beamType === "Single");
    } else if (chassisType === 2) {
        this.trailers = this.originalTrailers.filter(trailer => trailer.beamType === "Double");
    } else if (chassisType === 3) {
        this.trailers = this.originalTrailers.filter(trailer => trailer.beamType === "Unibody");
    } else {
      this.trailers = this.originalTrailers;
    }
  } 
}