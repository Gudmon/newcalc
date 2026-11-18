import { Component, OnDestroy, OnInit } from '@angular/core';
import { PalmsService } from '../../../shared/services/palms.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PalmsTrailerOverview } from '../../models/palms-trailer-overview';
import { LoadingService } from '../../../../../../services/loading.service';
import { PalmsTrailerCardsComponent } from '../palms-trailer-cards/palms-trailer-cards.component';
import { MachineType } from '../../../shared/models/machine-type';
import { ChassisType } from '../../../shared/models/chassis-type';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-palms-trailers',
    standalone: true,
    templateUrl: './palms-trailers.component.html',
    styleUrl: './palms-trailers.component.css',
    imports: [CommonModule, PalmsTrailerCardsComponent]
})
export class PalmsTrailersComponent implements OnInit, OnDestroy {
    protected readonly ChassisType = ChassisType;
    protected readonly MachineType = MachineType;
    private originalTrailers: PalmsTrailerOverview[] = [];

    trailers: PalmsTrailerOverview[] = [];
    loadError: string | null = null;
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly loadingService: LoadingService,
        private readonly router: Router,
        readonly palmsService: PalmsService
    ) {}

    ngOnInit(): void {
        this.loadTrailers();
        this.palmsService.selectedChassisType$.pipe(takeUntil(this.destroy$)).subscribe((chassisType) => {
            this.filterTrailers(chassisType);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadTrailers() {
        this.loadError = null;
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
                    this.originalTrailers = trailerOverView;
                    this.filterTrailers(this.palmsService._selectedChassisType.value);
                },
                error: (error: unknown) => {
                    console.error('Failed to load PALMS trailers.', error);
                    this.loadError = 'A pótkocsik betöltése nem sikerült. Próbálja újra.';
                }
            })
            .add(() => {
                this.loadingService.disableLoader();
            });
    }

    navigateToTrailer(trailer: PalmsTrailerOverview) {
        this.router.navigate(['/configurator/palms/trailers', trailer.id]);
    }

    setSelectedChassisType(chassisType: ChassisType, event: Event) {
        this.palmsService._selectedChassisType.value === chassisType
            ? this.palmsService._selectedChassisType.next(null)
            : this.palmsService._selectedChassisType.next(chassisType);
    }

    private filterTrailers(chassisType: ChassisType | null) {
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
