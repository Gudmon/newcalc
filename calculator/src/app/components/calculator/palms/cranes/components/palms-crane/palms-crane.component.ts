import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from "../../../../../navigation/navigation.component";
import { FooterComponent } from "../../../../../footer/footer.component";
import { PalmsCraneInformationComponent } from "../palms-crane-information/palms-crane-information.component";
import { PalmsService } from '../../../shared/services/palms.service';
import { LoadingService } from '../../../../../../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PalmsCrane } from '../../models/palms-crane';
import { CommonModule } from '@angular/common';
import { ConfigurationItem } from '../../../../../../models/configuration-item';
import { PalmsCraneConfigService } from '../../services/palms-crane-config.service';
import { forkJoin } from 'rxjs';
import { ListboxChangeEvent, ListboxModule } from 'primeng/listbox';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { AccessoryItemComponent } from "../../../shared/components/accessory-item/accessory-item.component";
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { FrameTypesDialogComponent } from "../frame-types-dialog/frame-types-dialog.component";
import { FrameType } from '../../models/frame-type';

@Component({
    selector: 'app-palms-crane',
    standalone: true,
    templateUrl: './palms-crane.component.html',
    styleUrl: './palms-crane.component.css',
    imports: [FormsModule, ReactiveFormsModule, AccordionModule, NavigationComponent, FooterComponent, PalmsCraneInformationComponent, CommonModule, ListboxModule, AccessoryItemComponent, FormatPricePipe, FrameTypesDialogComponent]
})
export class PalmsCraneComponent implements OnInit {
    crane!: PalmsCrane
    private id = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;

    trailerSelected: boolean = false;
    craneSelected: boolean = false;
    hintsChecked: boolean = true;

//   @ViewChild('oilTankCoolerCheckBox') oilTankCoolerCheckBox!: Checkbox;
//   @ViewChild('woodSorterCheckBox') woodSorterCheckBox!: Checkbox;
//   @ViewChild('woodSorterDropdown') woodSorterDropdown!: Dropdown;
 
    showFrameTypesDialog: boolean = false;
    
    frameTypes: FrameType[] = [];

    originalStanchionPrice = 0;
    originalFrameTypePrice = 0;
    //   originalPropulsionPrice = 0;
    //   originalDrawbarPrice = 0;
    //   originalPlatformPrice = 0;
    //   originalOilPumpPrice = 0;
    //   originalOilTankPrice = 0;
    //   originalOilTankCoolerPrice = 0;
    //   originalBolsterLockPrice = 0;
    //   originalBboxPrice = 0;
    //   originalWoodSorterPrice = 0;
    //   originalHandBrakePrice = 0;
    //   originalChainsawHolderPrice = 0;
    //   originalUnderrunProtectionPrice = 0;
    //   originalSupportLegPrice = 0;
    //   originalLightPrice = 0;
    //   originalTyrePrice = 0;

    initialTrailerPrice = 0;

    originalFrameType: ConfigurationItem | undefined = undefined;
    //   originalBrake: ConfigurationItem | undefined = undefined;
    //   originalPropulsion: ConfigurationItem | undefined = undefined;
    //   originalDrawbar: ConfigurationItem | undefined = undefined;
    //   originalPlatform: ConfigurationItem | undefined = undefined;
    //   originalOilPump: ConfigurationItem | undefined = undefined;
    //   originalOilTank: ConfigurationItem | undefined = undefined;
    //   originalOilTankCooler: ConfigurationItem | undefined = undefined;
    //   originalBolsterLock: ConfigurationItem | undefined = undefined;
    //   originalBbox: ConfigurationItem | undefined = undefined;
    //   originalWoodSorter: ConfigurationItem | undefined = undefined;
    //   woodSorterArrayElements: any[] | undefined = [];
    //   originalHandBrake: ConfigurationItem | undefined = undefined;
    //   originalChainsawHolder: ConfigurationItem | undefined = undefined;
    //   originalUnderrunProtection: ConfigurationItem | undefined = undefined;
    //   originalSupportLeg: ConfigurationItem | undefined = undefined;
    //   originalLight: ConfigurationItem | undefined = undefined;
    //   originalTyre: ConfigurationItem | undefined = undefined;



    craneFormGroup: FormGroup = new FormGroup({
        selectedCrane: new FormControl<string>(''),
        selectedFrameType: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''})
    });

    private initializeFormGroup(): void {
        
    

        this.craneFormGroup = this.fb.group({
            selectedCrane: null,
            selectedFrameType: [this.frameTypes[0]],
        });
    }  

    constructor(readonly palmsService: PalmsService,
        readonly palmsCraneConfigService: PalmsCraneConfigService,
        readonly loadingService: LoadingService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router) {    
    }

    ngOnInit(): void {
        this.palmsService.getCrane(this.id).pipe().subscribe((response) => {
            this.crane = response as PalmsCrane; 
        })  
        
    }

    navigateToTrailer(trailerId: number){
        this.router.navigate(['/calculator/palms/trailers', trailerId]);
      }

    loadCraneConfigurations(){ 
        this.loadingService.enableLoader();
        const frameTypes$ = this.palmsCraneConfigService.getFrameTypes(this.id)
    
        const request = forkJoin([frameTypes$]);
       
        request.subscribe(([frameTypes]) => {
            if(frameTypes){
                this.frameTypes = frameTypes
                console.log(frameTypes); 
            }
          
          this.initializeFormGroup();
          this.craneSelected = true;
        }).add(() => this.loadingService.disableLoader())
    } 

    handleFrameTypeChange(event: ListboxChangeEvent) {
        const previousValue = this.originalFrameTypePrice;
        this.originalFrameTypePrice = event.value ? event.value.price : 0;
        const nextValue = this.originalFrameTypePrice;
        const current = this.palmsService._cranePrice();
      
        if (previousValue !== nextValue) {
          const newPrice = current - previousValue + Number(nextValue);
          this.palmsService._cranePrice.set(newPrice);
        }
    
        if (event.value){
          this.originalFrameType = event.value;
        } else {
          this.originalFrameType = undefined;
        }
    }

    delete() {
        console.log('crane fg', this.craneFormGroup.value);
    
        this.craneSelected = false;
        
        this.palmsService._cranePrice.set(0);
        this.craneFormGroup.reset();
        this.originalFrameType = undefined;
        
      }

      toggleDialog(dialogType: string, show: boolean) {
        switch (dialogType) {
            case 'frameTypes':
                this.showFrameTypesDialog = show;
                break;
            default:
              break;
          }
      }
}
