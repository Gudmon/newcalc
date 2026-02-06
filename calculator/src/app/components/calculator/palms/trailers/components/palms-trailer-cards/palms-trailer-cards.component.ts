import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PalmsTrailerOverview } from '../../models/palms-trailer-overview';
import { CardModule } from 'primeng/card';
import { PalmsService } from '../../../shared/services/palms.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ComparisonStoreService } from '../../services/comparison-store.service';
import { LoadingService } from '../../../../../../services/loading.service';
import { AccordionModule } from 'primeng/accordion';
import { ComparisonAccordionComponent } from '../../../comparison-accordion/comparison-accordion.component';

@Component({
    selector: 'app-palms-trailer-cards',
    standalone: true,
    imports: [CardModule, CommonModule, TagModule, AccordionModule, ComparisonAccordionComponent],
    templateUrl: './palms-trailer-cards.component.html',
    styleUrl: './palms-trailer-cards.component.css'
})
export class PalmsTrailerCardsComponent {
    @Input({ required: true }) trailers!: PalmsTrailerOverview[];
    @Output() buttonClickEmitter = new EventEmitter<PalmsTrailerOverview>();

    constructor(
        readonly palmsService: PalmsService,
        readonly comparisonStoreService: ComparisonStoreService,
        readonly loadingService: LoadingService
    ) {}

    buttonClickEmit(trailer: PalmsTrailerOverview) {

        this.buttonClickEmitter.emit(trailer);
    }

    addToComparison(trailerOverView: PalmsTrailerOverview) {
        this.loadingService.enableLoader();
        this.palmsService
            .getTrailer(trailerOverView.id)
            .subscribe((trailer) => this.comparisonStoreService.addVehicle(trailer))
            .add(() => this.loadingService.disableLoader());
    }
}
