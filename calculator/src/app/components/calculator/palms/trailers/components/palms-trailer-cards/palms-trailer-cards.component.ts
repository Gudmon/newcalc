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
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

@Component({
    selector: 'app-palms-trailer-cards',
    standalone: true,
    imports: [CardModule, CommonModule, TagModule, AccordionModule, ComparisonAccordionComponent, CloudinaryModule],
    templateUrl: './palms-trailer-cards.component.html',
    styleUrl: './palms-trailer-cards.component.css'
})
export class PalmsTrailerCardsComponent {
    cld = new Cloudinary({
        cloud: {
            cloudName: 'dhidgc7eu'
        }
    });
    _trailers: PalmsTrailerOverview[] = [];
    @Input({ required: true }) set trailers(trailers: PalmsTrailerOverview[]) {
        trailers.map((trailer) => {
            trailer.image = this.cld.image(trailer.imageUrl).resize(fill().width(300).height(200));
        });
        this._trailers = trailers;
    }

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
