import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PalmsCraneOverview } from '../../models/palms-crane-overview';
import { CardModule } from 'primeng/card';
import { PalmsService } from '../../../shared/services/palms.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ComparisonStoreService } from '../../../trailers/services/comparison-store.service';
import { LoadingService } from '../../../../../../services/loading.service';
import { ComparisonAccordionComponent } from '../../../comparison-accordion/comparison-accordion.component';

@Component({
    selector: 'app-palms-crane-cards',
    standalone: true,
    imports: [CardModule, CommonModule, TagModule, ComparisonAccordionComponent],
    templateUrl: './palms-crane-cards.component.html',
    styleUrl: './palms-crane-cards.component.css'
})
export class PalmsCraneCardsComponent {
    @Input({ required: true }) cranes!: PalmsCraneOverview[];
    @Output() buttonClickEmitter = new EventEmitter<PalmsCraneOverview>();

    constructor(
        readonly palmsService: PalmsService,
        readonly comparisonStoreService: ComparisonStoreService,
        readonly loadingService: LoadingService
    ) {}

    buttonClickEmit(crane: PalmsCraneOverview) {

        this.buttonClickEmitter.emit(crane);
    }

    addToComparison(craneOverView: PalmsCraneOverview) {
        this.loadingService.enableLoader();
        this.palmsService
            .getCrane(craneOverView.id)
            .subscribe((crane) => this.comparisonStoreService.addVehicle(crane))
            .add(() => this.loadingService.disableLoader());
    }
}
