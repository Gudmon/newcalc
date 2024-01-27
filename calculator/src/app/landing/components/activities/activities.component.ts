import { Component } from '@angular/core';
import { TruncatePipe } from "../../../components/pipes/truncate.pipe";

@Component({
    selector: 'app-activities',
    standalone: true,
    templateUrl: './activities.component.html',
    styleUrl: './activities.component.css',
    imports: [TruncatePipe]
})
export class ActivitiesComponent {

}
