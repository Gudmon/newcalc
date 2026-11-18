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
    let navigate: jasmine.Spy;

    beforeEach(async () => {
        queryParamMap = new BehaviorSubject(convertToParamMap({}));
        selectedMachineType = new BehaviorSubject<MachineType | null>(null);
        navigate = jasmine.createSpy('navigate');

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
                { provide: Router, useValue: { navigate } }
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

    it('navigates to the absolute overview route when changing machine type', () => {
        component.setSelectedMachineType(MachineType.Crane);

        expect(navigate).toHaveBeenCalledWith(['/configurator/palms'], {
            queryParams: { machine: 'crane' },
            replaceUrl: true
        });
    });
});
