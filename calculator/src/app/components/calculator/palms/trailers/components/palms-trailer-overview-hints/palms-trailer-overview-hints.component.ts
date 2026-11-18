import { Component } from '@angular/core';
import { PALMS_TRAILER_MODEL_HINTS } from '../../../shared/models/palms-trailer-model-hints';

@Component({
    selector: 'app-palms-trailer-overview-hints',
    standalone: true,
    imports: [],
    templateUrl: './palms-trailer-overview-hints.component.html',
    styleUrl: './palms-trailer-overview-hints.component.css'
})
export class PalmsTrailerOverviewHintsComponent {
    readonly hints = PALMS_TRAILER_MODEL_HINTS;
}
