import { Component } from '@angular/core';
import { ComparisonStoreService } from '../trailers/services/comparison-store.service';
import { AccordionModule } from 'primeng/accordion';
import { AsyncPipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { ComparisonComponent } from '../comparison/comparison.component';
import { PalmsTrailer } from '../trailers/models/palms-trailer';
import { PalmsCrane } from '../cranes/models/palms-crane';

@Component({
  selector: 'app-comparison-accordion',
  standalone: true,
  providers: [DialogService],
  imports: [AccordionModule, AsyncPipe],
  templateUrl: './comparison-accordion.component.html',
  styleUrl: './comparison-accordion.component.css'
})
export class ComparisonAccordionComponent {
 constructor(readonly comparisonStoreService: ComparisonStoreService,
  private readonly dialogService: DialogService
 ){}

 openComparisonTable(){
    this.dialogService.open(ComparisonComponent, {
      width: '100%',
      appendTo: 'body',
      modal: true,
      closable: true,
    });
 }

 removeVehicles(){
  this.comparisonStoreService.clear();
 }

 removeVehicle(vehicle: PalmsTrailer | PalmsCrane){
  this.comparisonStoreService.removeVehicle(vehicle);
 }
}
