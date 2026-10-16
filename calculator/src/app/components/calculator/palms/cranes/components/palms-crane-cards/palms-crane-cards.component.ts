import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PalmsCraneOverview } from '../../models/palms-crane-overview';
import { CardModule } from 'primeng/card';
import { PalmsService } from '../../../shared/services/palms.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ComparisonStoreService } from '../../../trailers/services/comparison-store.service';
import { LoadingService } from '../../../../../../services/loading.service';
import { ComparisonAccordionComponent } from '../../../comparison-accordion/comparison-accordion.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { CloudinaryService } from '../../../../../../services/cloudinary.service';

@Component({
    selector: 'app-palms-crane-cards',
    standalone: true,
    imports: [CardModule, CommonModule, TagModule, ComparisonAccordionComponent, CloudinaryModule],
    templateUrl: './palms-crane-cards.component.html',
    styleUrl: './palms-crane-cards.component.css'
})
export class PalmsCraneCardsComponent {
    _cranes: PalmsCraneOverview[] = [];
    @Input({ required: true }) set cranes(cranes: PalmsCraneOverview[]) {
        cranes.forEach((crane) => {
            crane.image = this.cloudinaryService.cloudinary.image(crane.imageUrl).resize(fill().width(300).height(200));
        });
        this._cranes = cranes;
    }
    @Output() buttonClickEmitter = new EventEmitter<PalmsCraneOverview>();

    constructor(
        readonly palmsService: PalmsService,
        readonly comparisonStoreService: ComparisonStoreService,
        readonly loadingService: LoadingService,
        private readonly cloudinaryService: CloudinaryService
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
