import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { PalmsTrailerOverview } from '../../trailers/models/palms-trailer-overview';
import { PalmsTrailer } from '../../trailers/models/palms-trailer';
import { PalmsCraneOverview } from '../../cranes/models/palms-crane-overview';
import { PalmsCrane } from '../../cranes/models/palms-crane';
import { ConfigurationItem } from '../../../../../models/configuration-item';
import { Cloudinary } from '@cloudinary/url-gen/instance/Cloudinary';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { fill, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
@Injectable({
    providedIn: 'root'
})
export class PalmsService {
    //private url = 'http://localhost:5140';
    private url = 'https://calculator-app-api.azurewebsites.net';

    public _selectedMachineType = new BehaviorSubject<number | null>(null);
    public selectedMachineType$ = this._selectedMachineType.asObservable();

    public _selectedChassisType = new BehaviorSubject<number | null>(null);
    public selectedChassisType$ = this._selectedChassisType.asObservable();

    public _trailerPrice = signal<number>(0);
    public _cranePrice = signal<number>(0);

    public _selectedCrane = new BehaviorSubject<PalmsCraneOverview | undefined>(undefined);
    public selectedCrane$ = this._selectedCrane.asObservable();

    public _selectedTrailer = new BehaviorSubject<PalmsTrailerOverview | undefined>(undefined);
    public selectedTrailer$ = this._selectedTrailer.asObservable();

    public _selectedAccordion = signal(0);

    public _deleteCrane = new BehaviorSubject<boolean>(false);
    public deleteCrane$ = this._deleteCrane.asObservable();

    public _deleteTrailer = new BehaviorSubject<boolean>(false);
    public deleteTrailer$ = this._deleteTrailer.asObservable();

    public _craneSelected = new BehaviorSubject<boolean>(false);
    public craneSelected$ = this._craneSelected.asObservable();

    public _trailerSelected = new BehaviorSubject<boolean>(false);
    public trailerSelected$ = this._trailerSelected.asObservable();

    public _totalPrice = computed(() => this._trailerPrice() + this._cranePrice());

    cld = new Cloudinary({
        cloud: {
            cloudName: 'dhidgc7eu'
        }
    });

    // CRANES
    public selectedControlBlock = signal<ConfigurationItem | undefined>(undefined);
    public selectedFrameType = signal<ConfigurationItem | undefined>(undefined);
    public selectedRotator = signal<ConfigurationItem | undefined>(undefined);
    public selectedGrapple = signal<ConfigurationItem | undefined>(undefined);
    public selectedGrapples: (ConfigurationItem | undefined)[] = [];
    public selectedWinch = signal<ConfigurationItem | undefined>(undefined);
    public selectedProtectionSleeves = signal<ConfigurationItem | undefined>(undefined);
    public selectedElectricalFloating = signal<ConfigurationItem | undefined>(undefined);
    public selectedValveBlock = signal<ConfigurationItem | undefined>(undefined);
    public selectedDamping = signal<ConfigurationItem | undefined>(undefined);
    public selectedCraneLight = signal<ConfigurationItem | undefined>(undefined);
    public selectedOperatorSeat = signal<ConfigurationItem | undefined>(undefined);
    public selectedHighPerformanceOilFilter = signal<ConfigurationItem | undefined>(undefined);
    public selectedCraneOilCooler = signal<ConfigurationItem | undefined>(undefined);
    public selectedRotatorBrake = signal<ConfigurationItem | undefined>(undefined);
    public selectedJoystickHolder = signal<ConfigurationItem | undefined>(undefined);
    public selectedHoseGuard = signal<ConfigurationItem | undefined>(undefined);
    public selectedTurningDeviceCounterPlate = signal<ConfigurationItem | undefined>(undefined);
    public selectedSupportLegCounterPlate = signal<ConfigurationItem | undefined>(undefined);
    public selectedBoomGuard = signal<ConfigurationItem | undefined>(undefined);
    public selectedCover = signal<ConfigurationItem | undefined>(undefined);
    public selectedWoodControl = signal<ConfigurationItem | undefined>(undefined);
    public selectedLinkage = signal<ConfigurationItem | undefined>(undefined);
    public selectedCraneShipping = signal<ConfigurationItem | undefined>(undefined);

    // TRAILERS
    public selectedStanchion = signal<ConfigurationItem | undefined>(undefined);
    public selectedBrake = signal<ConfigurationItem | undefined>(undefined);
    public selectedPropulsion = signal<ConfigurationItem | undefined>(undefined);
    public selectedDrawbar = signal<ConfigurationItem | undefined>(undefined);
    public selectedPlatform = signal<ConfigurationItem | undefined>(undefined);
    public selectedOilPump = signal<ConfigurationItem | undefined>(undefined);
    public selectedOilTank = signal<ConfigurationItem | undefined>(undefined);
    public selectedTrailerOilCooler = signal<ConfigurationItem | undefined>(undefined);
    public selectedSupportLeg = signal<ConfigurationItem | undefined>(undefined);
    public selectedTrailerLight = signal<ConfigurationItem | undefined>(undefined);
    public selectedTyre = signal<ConfigurationItem | undefined>(undefined);
    public selectedBolsterLock = signal<ConfigurationItem | undefined>(undefined);
    public selectedBBox = signal<ConfigurationItem | undefined>(undefined);
    public selectedDBox = signal<ConfigurationItem | undefined>(undefined);
    public selectedHayBaleFrame = signal<ConfigurationItem | undefined>(undefined);
    public selectedWoodSorter = signal<ConfigurationItem | undefined>(undefined);
    public selectedHandBrake = signal<ConfigurationItem | undefined>(undefined);
    public selectedChainsawHolder = signal<ConfigurationItem | undefined>(undefined);
    public selectedUnderrunProtection = signal<ConfigurationItem | undefined>(undefined);
    public selectedBunkAdapter = signal<ConfigurationItem | undefined>(undefined);
    public selectedBunkExtension = signal<ConfigurationItem | undefined>(undefined);
    public selectedFrameExtension = signal<ConfigurationItem | undefined>(undefined);
    public selectedTrailerShipping = signal<ConfigurationItem | undefined>(undefined);
    public selectedMOT = signal<ConfigurationItem | undefined>(undefined);
    public selectedStanchionExtension = signal<ConfigurationItem | undefined>(undefined);
    public selectedHydroPack = signal<ConfigurationItem | undefined>(undefined);
    public selectedSupplyFormat = signal<ConfigurationItem | undefined>(undefined);
    public selectedToolbox = signal<ConfigurationItem | undefined>(undefined);

    constructor(private httpClient: HttpClient) {}

    getTrailers(): Observable<PalmsTrailerOverview[]> {
        return this.httpClient.get<PalmsTrailerOverview[]>(`${this.url}/Palms/trailers`).pipe(
            map((trailerOvewViews: PalmsTrailerOverview[]) => {
                trailerOvewViews.map((trailerOvewView) => {
                    trailerOvewView.image = this.cld.image(trailerOvewView.imageUrl).resize(fill().width(300).height(200));
                });
                return trailerOvewViews;
            })
        );
    }

    getTrailer(id: number): Observable<PalmsTrailer> {
        return this.httpClient.get<PalmsTrailer>(`${this.url}/Palms/trailers/${id}`).pipe(
            map((trailer: PalmsTrailer) => {
                trailer.images = (trailer.imageUrls ?? []).map((imgUrl) =>
                    this.cld.image(imgUrl).delivery(format('auto')).delivery(quality('auto'))
                );

                for (const crane of trailer.cranes) {
                    crane.imageUrl = `../../../../../assets/${crane.name}-1.svg`;
                }

                return trailer;
            })
        );
    }

    getCranes(): Observable<PalmsCraneOverview[]> {
        return this.httpClient.get<PalmsCraneOverview[]>(`${this.url}/Palms/cranes`).pipe(
            map((craneOverViews: PalmsCraneOverview[]) => {
                craneOverViews.map((craneOverView) => {
                    craneOverView.image = this.cld.image(craneOverView.imageUrl).resize(fill().width(300).height(200));
                });
                console.log('crane ov', craneOverViews);

                return craneOverViews;
            })
        );
    }

    getCrane(id: number): Observable<PalmsCrane> {
        return this.httpClient.get<PalmsCrane>(`${this.url}/Palms/cranes/${id}`).pipe(
            map((crane: PalmsCrane) => {
                crane.images = (crane.imageUrls ?? []).map((imgUrl) =>
                    this.cld.image(imgUrl).delivery(format('auto')).delivery(quality('auto'))
                );

                for (const trailer of crane.trailers) {
                    if (trailer.id === 8) trailer.imageUrl = `../../../../../assets/PALMS 10U-1.svg`;
                    else if (trailer.id === 9 || trailer.id === 10) trailer.imageUrl = `../../../../../assets/PALMS 12U-1.svg`;
                    else if (trailer.id === 11 || trailer.id === 12) trailer.imageUrl = `../../../../../assets/PALMS 15U-1.svg`;
                    else {
                        trailer.imageUrl = `../../../../../assets/${trailer.name}-1.svg`;
                    }
                }

                console.log('imgs', crane.images);

                return crane;
            })
        );
    }

    deleteTrailer() {
        this.selectedStanchion.set(undefined);
        this.selectedBrake.set(undefined);
        this.selectedPropulsion.set(undefined);
        this.selectedDrawbar.set(undefined);
        this.selectedPlatform.set(undefined);
        this.selectedOilPump.set(undefined);
        this.selectedOilTank.set(undefined);
        this.selectedTrailerOilCooler.set(undefined);
        this.selectedSupportLeg.set(undefined);
        this.selectedTrailerLight.set(undefined);
        this.selectedTyre.set(undefined);
        this.selectedBolsterLock.set(undefined);
        this.selectedBBox.set(undefined);
        this.selectedDBox.set(undefined);
        this.selectedHayBaleFrame.set(undefined);
        this.selectedWoodControl.set(undefined);
        this.selectedHandBrake.set(undefined);
        this.selectedChainsawHolder.set(undefined);
        this.selectedUnderrunProtection.set(undefined);
        this.selectedBunkAdapter.set(undefined);
        this.selectedBunkExtension.set(undefined);
        this.selectedFrameExtension.set(undefined);
        this.selectedTrailerShipping.set(undefined);
        this.selectedMOT.set(undefined);
        this.selectedStanchionExtension.set(undefined);
        this.selectedHydroPack.set(undefined);
        this.selectedSupplyFormat.set(undefined);
        this.selectedToolbox.set(undefined);
    }

    deleteCrane() {
        this.selectedControlBlock.set(undefined);
        this.selectedFrameType.set(undefined);
        this.selectedRotator.set(undefined);
        this.selectedGrapple.set(undefined);
        this.selectedGrapples = [];
        this.selectedWinch.set(undefined);
        this.selectedProtectionSleeves.set(undefined);
        this.selectedElectricalFloating.set(undefined);
        this.selectedValveBlock.set(undefined);
        this.selectedDamping.set(undefined);
        this.selectedCraneLight.set(undefined);
        this.selectedOperatorSeat.set(undefined);
        this.selectedHighPerformanceOilFilter.set(undefined);
        this.selectedCraneOilCooler.set(undefined);
        this.selectedRotatorBrake.set(undefined);
        this.selectedJoystickHolder.set(undefined);
        this.selectedHoseGuard.set(undefined);
        this.selectedTurningDeviceCounterPlate.set(undefined);
        this.selectedSupportLegCounterPlate.set(undefined);
        this.selectedBoomGuard.set(undefined);
        this.selectedCover.set(undefined);
        this.selectedWoodControl.set(undefined);
        this.selectedLinkage.set(undefined);
        this.selectedCraneShipping.set(undefined);
    }
}
