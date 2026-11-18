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
import { CloudinaryModule } from '@cloudinary/ng';
import { CloudinaryService } from '../../../../../../services/cloudinary.service';
import { TooltipModule } from 'primeng/tooltip';
import { PALMS_TRAILER_MODEL_HINTS } from '../../../shared/models/palms-trailer-model-hints';

@Component({
    selector: 'app-palms-trailer-cards',
    standalone: true,
    imports: [CardModule, CommonModule, TagModule, AccordionModule, ComparisonAccordionComponent, CloudinaryModule, TooltipModule],
    templateUrl: './palms-trailer-cards.component.html',
    styleUrl: './palms-trailer-cards.component.css'
})
export class PalmsTrailerCardsComponent {
    _trailers: PalmsTrailerOverview[] = [];
    @Input({ required: true }) set trailers(trailers: PalmsTrailerOverview[]) {
        trailers.forEach((trailer) => {
            trailer.image = this.cloudinaryService.machinePreview(trailer.imageUrl);
        });
        this._trailers = trailers;
    }

    @Output() buttonClickEmitter = new EventEmitter<PalmsTrailerOverview>();

    constructor(
        readonly palmsService: PalmsService,
        private readonly comparisonStoreService: ComparisonStoreService,
        private readonly loadingService: LoadingService,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    buttonClickEmit(trailer: PalmsTrailerOverview) {
        this.buttonClickEmitter.emit(trailer);
    }

    getTrailerTypeDescription(name: string, beamType: string): string {
        const modelName = name.toUpperCase().replace(/^PALMS\s+/, '');
        const modelType = PALMS_TRAILER_MODEL_HINTS.find((hint) =>
            new RegExp(`(^|[^A-Z])${hint.title}($|[^A-Z])`).test(modelName)
        );
        return modelType?.description ?? beamType;
    }

    addToComparison(trailerOverView: PalmsTrailerOverview) {
        this.loadingService.enableLoader();
        this.palmsService
            .getTrailer(trailerOverView.id)
            .subscribe({
                next: (resp) => {
                    this.comparisonStoreService.addVehicle(resp);
                },
                error: (error) => {
                    console.error('Error adding trailer to comparison:', error);
                }
            })
            .add(() => this.loadingService.disableLoader());
    }
}
