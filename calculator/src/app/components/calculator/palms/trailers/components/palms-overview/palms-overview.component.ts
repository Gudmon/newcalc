import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from "../../../../../navigation/navigation.component";
import { FooterComponent } from "../../../../../footer/footer.component";
import { CommonModule } from '@angular/common';
import { PalmsTrailersComponent } from "../palms-trailers/palms-trailers.component";
import { PalmsService } from '../../../shared/services/palms.service';
import { PalmsTrailerOverviewHintsComponent } from '../palms-trailer-overview-hints/palms-trailer-overview-hints.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-palms-overview',
    standalone: true,
    templateUrl: './palms-overview.component.html',
    styleUrl: './palms-overview.component.css',
    imports: [NavigationComponent, FooterComponent, PalmsTrailersComponent, CommonModule, PalmsTrailerOverviewHintsComponent, InputSwitchModule, FormsModule]
})
export class PalmsOverviewComponent{
    tabSelected: boolean = false;
    hintsChecked: boolean = true;
    constructor(readonly palmsService: PalmsService){}

    setSetelectedMachineType(machineType: number, event: Event) {
        this.palmsService._selectedMachineType.next(machineType);
        this.tabSelected = true;
    }

    setSelectedChassisType(chassisType: number, event: Event){
        if(this.palmsService._selectedChassisType.value === chassisType) this.palmsService._selectedChassisType.next(0);

        else {
            this.palmsService._selectedChassisType.next(chassisType);
            this.tabSelected = true;
        }                
    }
}
