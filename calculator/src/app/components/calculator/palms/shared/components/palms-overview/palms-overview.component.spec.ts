import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, convertToParamMap } from 'rxjs';
import { MachineType } from '../../models/machine-type';
import { PalmsService } from '../../services/palms.service';
import { PalmsOverviewComponent } from './palms-overview.component';

describe('PalmsOverviewComponent', () => {
    let component: PalmsOverviewComponent;
    let fixture: ComponentFixture<PalmsOverviewComponent>;
    let queryParamMap: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
    let selectedMachineType: BehaviorSubject<MachineType | null>;

    beforeEach(async () => {
        queryParamMap = new BehaviorSubject(convertToParamMap({}));
        selectedMachineType = new BehaviorSubject<MachineType | null>(null);

        await TestBed.configureTestingModule({
            imports: [PalmsOverviewComponent],
            providers: [
                {
                    provide: PalmsService,
                    useValue: {
                        _selectedMachineType: selectedMachineType,
                        selectedMachineType$: selectedMachineType.asObservable()
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: { queryParamMap: queryParamMap.asObservable() }
                },
                { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
            ]
        })
            .overrideComponent(PalmsOverviewComponent, { set: { template: '' } })
            .compileComponents();

        fixture = TestBed.createComponent(PalmsOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('defaults to trailers when no machine query parameter is provided', () => {
        expect(selectedMachineType.value).toBe(MachineType.Trailer);
    });

    it('updates the selected machine when the query parameter changes', () => {
        queryParamMap.next(convertToParamMap({ machine: 'crane' }));

        expect(selectedMachineType.value).toBe(MachineType.Crane);
    });
});
