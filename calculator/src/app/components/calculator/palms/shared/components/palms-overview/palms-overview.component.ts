import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationComponent } from '../../../../../navigation/navigation.component';
import { FooterComponent } from '../../../../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { PalmsTrailersComponent } from '../../../trailers/components/palms-trailers/palms-trailers.component';
import { PalmsService } from '../../services/palms.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { PalmsCranesComponent } from '../../../cranes/components/palms-cranes/palms-cranes.component';
import { MachineType } from '../../models/machine-type';
import { PalmsTrailerOverviewHintsComponent } from '../../../trailers/components/palms-trailer-overview-hints/palms-trailer-overview-hints.component';

@Component({
    selector: 'app-palms-overview',
    standalone: true,
    templateUrl: './palms-overview.component.html',
    styleUrl: './palms-overview.component.css',
    imports: [
        NavigationComponent,
        FooterComponent,
        PalmsTrailersComponent,
        CommonModule,
        InputSwitchModule,
        FormsModule,
        PalmsCranesComponent,
        PalmsTrailerOverviewHintsComponent
    ]
})
export class PalmsOverviewComponent implements OnInit {
    protected readonly MachineType = MachineType;
    hintsChecked = true;
    private readonly destroyRef = inject(DestroyRef);

    constructor(
        readonly palmsService: PalmsService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
            const machineType = params.get('machine') === 'crane' ? MachineType.Crane : MachineType.Trailer;
            if (this.palmsService._selectedMachineType.value !== machineType) {
                this.palmsService._selectedMachineType.next(machineType);
            }
        });
    }

    setSelectedMachineType(machineType: MachineType) {
        this.palmsService._selectedMachineType.next(machineType);
        this.router.navigate(['/configurator/palms'], {
            queryParams: { machine: machineType === MachineType.Trailer ? 'trailer' : 'crane' },
            replaceUrl: true
        });
    }
}
