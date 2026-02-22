import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PalmsService } from '../../../shared/services/palms.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { PalmsTrailerOverview } from '../../models/palms-trailer-overview';
import { LoadingService } from '../../../../../../services/loading.service';
import { PalmsTrailerOverviewHintsComponent } from '../palms-trailer-overview-hints/palms-trailer-overview-hints.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PalmsTrailerCardsComponent } from '../palms-trailer-cards/palms-trailer-cards.component';
import { MachineType } from '../../../shared/models/machine-type';
import { ChassisType } from '../../../shared/models/chassis-type';

@Component({
    selector: 'app-palms-trailers',
    standalone: true,
    templateUrl: './palms-trailers.component.html',
    styleUrl: './palms-trailers.component.css',
    imports: [FormsModule, CommonModule, CardModule, PalmsTrailerOverviewHintsComponent, InputSwitchModule, PalmsTrailerCardsComponent]
})
export class PalmsTrailersComponent implements OnInit {
    protected readonly ChassisType = ChassisType;
    protected readonly MachineType = MachineType;
    private originalTrailers: PalmsTrailerOverview[] = [];

    hintsChecked: boolean = true;
    trailers: PalmsTrailerOverview[] = [];

    constructor(
        private readonly loadingService: LoadingService,
        private readonly router: Router,
        readonly palmsService: PalmsService
    ) {}

    ngOnInit(): void {
        this.loadingService.enableLoader();
        this.palmsService
            .getTrailers()
            .subscribe({
                next: (resp) => {
                    this.palmsService._deleteTrailer.next(true);
                    this.palmsService._deleteCrane.next(true);
                    this.palmsService._trailerSelected.next(false);
                    this.palmsService._craneSelected.next(false);
                    this.palmsService._selectedTrailer.next(undefined);
                    this.palmsService._selectedCrane.next(undefined);

                    const trailerOverView = resp as PalmsTrailerOverview[];
                    this.trailers = trailerOverView;
                    this.originalTrailers = trailerOverView;
                }
            })
            .add(() => {
                this.loadingService.disableLoader();
            });

        this.palmsService.selectedChassisType$.pipe().subscribe((chassisType) => {
            this.filterTrailers(chassisType!);
        });
    }

    navigateToTrailer(trailer: PalmsTrailerOverview) {
        this.router.navigate(['/calculator/palms/trailers', trailer.id]);
    }

    setSelectedChassisType(chassisType: ChassisType, event: Event) {
        this.palmsService._selectedChassisType.value === chassisType
            ? this.palmsService._selectedChassisType.next(null)
            : this.palmsService._selectedChassisType.next(chassisType);
    }

    private filterTrailers(chassisType: ChassisType) {
        switch (chassisType) {
            case ChassisType.Single:
                this.trailers = this.originalTrailers.filter((trailer) => trailer.beamType === 'Egyalvázas');
                break;
            case ChassisType.Double:
                this.trailers = this.originalTrailers.filter((trailer) => trailer.beamType === 'Dupla alvázas');
                break;
            case ChassisType.Unibody:
                this.trailers = this.originalTrailers.filter((trailer) => trailer.beamType === 'Unibody (Forwarder)');
                break;
            default:
                this.trailers = this.originalTrailers;
                break;
        }
    }
}
