import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { AccessoryItemComponent } from "../../../shared/components/accessory-item/accessory-item.component";
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { FrameType } from '../../models/frame-type';
import { FrameTypesDialogComponent } from '../dialogs/frame-types-dialog/frame-types-dialog.component';
import { ControlBlocksDialogComponent } from "../dialogs/control-blocks-dialog/control-blocks-dialog.component";
import { Dropdown } from 'primeng/dropdown';
import { RotatorsDialogComponent } from "../dialogs/rotators-dialog/rotators-dialog.component";
import { GrapplesDialogComponent } from "../dialogs/grapples-dialog/grapples-dialog.component";

@Component({
    selector: 'app-palms-crane',
    standalone: true,
    templateUrl: './palms-crane.component.html',
    styleUrl: './palms-crane.component.css',
    imports: [FormsModule, ReactiveFormsModule, AccordionModule, NavigationComponent, FooterComponent, PalmsCraneInformationComponent, CommonModule, ListboxModule, AccessoryItemComponent, FormatPricePipe, FrameTypesDialogComponent, ControlBlocksDialogComponent, RotatorsDialogComponent, GrapplesDialogComponent]
})
export class PalmsCraneComponent implements OnInit {

    crane!: PalmsCrane
    private id = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;

    trailerSelected: boolean = false;
    craneSelected: boolean = false;
    frameTypeSelected: boolean = false;
    hintsChecked: boolean = true;

    @ViewChild('grappleListBox') grappleListBox!: Dropdown;
    @ViewChildren('grappleListBoxes') grappleListBoxes!: QueryList<Dropdown>;
//   @ViewChild('woodSorterCheckBox') woodSorterCheckBox!: Checkbox;
//   @ViewChild('woodSorterDropdown') woodSorterDropdown!: Dropdown;
 
    showControlBlocksDialog: boolean = false;
    showFrameTypesDialog: boolean = false;
    showRotatorsDialog: boolean = false;
    showGrapplesDialog: boolean = false;
    
    controlBlocks: ConfigurationItem[] = [];
    frameTypes: FrameType[] = [];
    rotators: ConfigurationItem[] = [];
    grapples: ConfigurationItem[] = [];

    originalControlBlockPrice = 0;
    originalFrameTypePrice = 0;
    originalRotatorPrice = 0;
    originalGrapplePrice = 0;
    originalGrapplePrices: number[] = [];
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


    originalControlBlock: ConfigurationItem | undefined = undefined;
    originalFrameType: ConfigurationItem | undefined = undefined;
    originalRotator: ConfigurationItem | undefined = undefined;
    originalGrapple: ConfigurationItem | undefined = undefined;
    originalGrapples: (ConfigurationItem | undefined)[] = [];
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


      get selectedGrapples(): FormArray {
        return this.craneFormGroup.get('selectedGrapples') as FormArray;
      }
    
      addGrapple() {
        this.selectedGrapples.push(this.fb.control(null));
        this.originalGrapplePrices.push(0);
      }
      
      removeGrapple(index: number) {
        this.selectedGrapples.removeAt(index);
        this.originalGrapplePrices.splice(index, 1); 
      }
      

    craneFormGroup: FormGroup = new FormGroup({
        selectedCrane: new FormControl<string>(''),
        selectedControlBlock: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedFrameType: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedGrapples: this.fb.array([]),
        selectedRotator: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedGrapple: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    });

    private initializeFormGroup(): void {
        this.craneFormGroup = this.fb.group({
            selectedCrane: null,
            selectedControlBlock: [],
            selectedFrameType: [],
            selectedGrapples: this.fb.array([]),
            selectedRotator: [],
            selectedGrapple: []
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
        const controlBlocks$ = this.palmsCraneConfigService.getControlBlocks(this.id)
        const frameTypes$ = this.palmsCraneConfigService.getFrameTypes(this.id)
        const rotators$ = this.palmsCraneConfigService.getRotators(this.id)
        const grapples$ = this.palmsCraneConfigService.getGrapples(this.id)
    
        const request = forkJoin([controlBlocks$, frameTypes$, rotators$, grapples$]);
       
        request.subscribe(([controlBlocks, frameTypes, rotators, grapples]) => {
            if(controlBlocks){
              this.controlBlocks = controlBlocks;
              console.log(controlBlocks); 
            }

            if(frameTypes){
                this.frameTypes = frameTypes;
                console.log(frameTypes); 
            }

            if(rotators){
                this.rotators = rotators;
                console.log(rotators); 
            }

            if(grapples){
                this.grapples = grapples.map((grapple) => ({
                  ...grapple,
                  disabledOption: grapple.id === 2
                }));
                console.log(grapples); 
            }
          
          this.initializeFormGroup();
          this.craneSelected = true;
          this.palmsService._cranePrice.set(Number(this.crane.price));
        }).add(() => this.loadingService.disableLoader())
    } 

    handleControlBlockChange(event: ListboxChangeEvent) {
      const previousValue = this.originalControlBlockPrice;
      this.originalControlBlockPrice = event.value ? event.value.price : 0;
      const nextValue = this.originalControlBlockPrice;
      const current = this.palmsService._cranePrice();
    
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
 
      let updatedFrameTypes: FrameType[] = [];
    
      if (event.value) {
        this.originalControlBlock = event.value;
    
        if (event.value.id < "8") {
          updatedFrameTypes = this.updateFrameTypesForControlBlock();
        } else {
          updatedFrameTypes = this.updateFrameTypesToEnabled();
        }
      } else {
        this.originalControlBlock = undefined;
        updatedFrameTypes = this.updateFrameTypesToEnabled();
      }
    
      this.frameTypes = updatedFrameTypes;
    }
    
    updateFrameTypesForControlBlock(): FrameType[] {
      return this.frameTypes.map((frameType) => ({
        ...frameType,
        disabledOption: frameType.code === "B011" || frameType.code === "B11"
      }));
    }

    updateFrameTypesToEnabled(): FrameType[] {
      return this.frameTypes.map((frameType) => ({
        ...frameType,
        disabledOption: false
      }));
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
    
      let updatedControlBlocks: ConfigurationItem[] = [];
    
      if (event.value) {
        this.originalFrameType = event.value;
    
        if (event.value.code === "B011" || event.value.code === "B11") {
          updatedControlBlocks = this.updateControlBlocksForFrameType();
        } else {
          updatedControlBlocks = this.updateControlBlocksToEnabled();
        }
      } else {
        this.originalFrameType = undefined;
        updatedControlBlocks = this.updateControlBlocksToEnabled();
      }
    
      this.controlBlocks = updatedControlBlocks;
    }
    
    updateControlBlocksForFrameType(): ConfigurationItem[] {
      return this.controlBlocks.map((controlBlock) => ({
        ...controlBlock,
        disabledOption: controlBlock.id < 8
      }));
    }

    updateControlBlocksToEnabled(): ConfigurationItem[]{
      return this.controlBlocks.map((controlBlock) => ({
        ...controlBlock,
        disabledOption: false
      }));
    }
   
    handleRotatorChange(event: ListboxChangeEvent) {
      const previousValue = this.originalRotatorPrice;
      this.originalRotatorPrice = event.value ? event.value.price : 0;
      const nextValue = this.originalRotatorPrice;
      const current = this.palmsService._cranePrice();
  
      if (previousValue !== nextValue) {
          const newPrice = current - previousValue + Number(nextValue);
          this.palmsService._cranePrice.set(newPrice);
      }
  
      if (event.value) {
          this.originalRotator = event.value;
          if (event.value.id === parseInt("2")){
            this.updateGrapplesToEnabled();

          } else {
            this.updateGrapplesAvailability();
          }
      } else {
          this.updateGrapplesAvailability();

          // Handle: rotator unselected, restricted grapples set to default 
          if(this.originalGrapple?.id === 2) {
            this.palmsService._cranePrice.update(value => value - Number(this.originalGrapple?.price))
            this.grappleListBox.writeValue(undefined);
            this.originalGrapple = undefined;
            this.originalGrapplePrice = 0;
          }

          // Handle: rotator unselected, restricted optional grapples set to default
          this.grappleListBoxes.forEach((grappleListBox, index) => {
            if(grappleListBox.value && grappleListBox.value.id === 2){
              this.palmsService._cranePrice.update(value => value - Number(this.originalGrapples[index]?.price))

              let grappleListBoxArray: any = [];
              if(this.grappleListBoxes) grappleListBoxArray = this.grappleListBoxes.toArray();
              if (grappleListBoxArray[index]) grappleListBoxArray[index].writeValue(undefined);

              this.originalGrapples[index] = undefined;
              this.originalGrapplePrices[index] = 0;
            }
          });
      }
    }
    
    updateGrapplesAvailability() {
        this.grapples = this.grapples.map((grapple) => ({
            ...grapple,
            disabledOption: grapple.id === 2
        }));
    }

    updateGrapplesToEnabled() {
      this.grapples = this.grapples.map((grapple) => ({
        ...grapple,
        disabledOption: false
      }));
    }

    handleMultipleGrappleChange(event: ListboxChangeEvent, index: number) {
      const previousValue = this.originalGrapplePrices[index];
      this.originalGrapplePrices[index] = event.value ? event.value.price : 0;
      const nextValue = this.originalGrapplePrices[index];
      const current = this.palmsService._cranePrice();
      
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      if (event.value){
        this.originalGrapples[index] = event.value
      } else {
        this.originalGrapples[index] = undefined;
      }
    }

    handleGrappleChange(event: ListboxChangeEvent) {
      const previousValue = this.originalGrapplePrice
      this.originalGrapplePrice = event.value ? event.value.price : 0;
      const nextValue = this.originalGrapplePrice
      const current = this.palmsService._cranePrice();
      
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      if (event.value){
        this.originalGrapple = event.value;
      } else {
        this.originalGrapple = undefined;
      }
    }

    loadControlBlocks(craneId: number, frameTypeId: number){
        this.palmsCraneConfigService.getControlBlocksByCraneFrameType(craneId, frameTypeId).subscribe((controlBlocks: ConfigurationItem[]) => {
            console.log(controlBlocks)
            this.controlBlocks = controlBlocks;
            this.frameTypeSelected = true;
        });
    }

    delete() {
        console.log('crane fg', this.craneFormGroup.value);
    
        this.craneSelected = false;
        
        this.palmsService._cranePrice.set(0);
        this.craneFormGroup.reset();
        this.originalControlBlock = undefined;
        this.originalFrameType = undefined;
        this.originalRotator = undefined;
        this.originalGrapple = undefined
        this.originalGrapples = [];
      }

      toggleDialog(dialogType: string, show: boolean) {
        switch (dialogType) {
            case 'controlBlocks':
                this.showControlBlocksDialog = show;
                break;
            case 'frameTypes':
                this.showFrameTypesDialog = show;
                break;   
            case 'rotators':
                this.showRotatorsDialog = show;
                break;
            case 'grapples':
                this.showGrapplesDialog = show;
                break;
            default:
              break;
          }
      }
}
