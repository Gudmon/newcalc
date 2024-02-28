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
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { AccessoryItemComponent } from "../../../shared/components/accessory-item/accessory-item.component";
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { FrameType } from '../../models/frame-type';
import { FrameTypesDialogComponent } from '../dialogs/frame-types-dialog/frame-types-dialog.component';
import { ControlBlocksDialogComponent } from "../dialogs/control-blocks-dialog/control-blocks-dialog.component";
import { Dropdown } from 'primeng/dropdown';
import { RotatorsDialogComponent } from "../dialogs/rotators-dialog/rotators-dialog.component";
import { GrapplesDialogComponent } from "../dialogs/grapples-dialog/grapples-dialog.component";
import { WinchesDialogComponent } from "../dialogs/winches-dialog/winches-dialog.component";
import { Checkbox, CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { ProtectionSleevesDialogComponent } from "../dialogs/protection-sleeves-dialog/protection-sleeves-dialog.component";
import { ElectricalFloatingDialogComponent } from "../dialogs/electrical-floating-dialog/electrical-floating-dialog.component";
import { ValveBlockDialogComponent } from "../dialogs/valve-block-dialog/valve-block-dialog.component";
import { DampingsDialogComponent } from "../dialogs/dampings-dialog/dampings-dialog.component";
import { CraneLightDialogComponent } from "../dialogs/crane-light-dialog/crane-light-dialog.component";
import { OperatorSeatDialogComponent } from "../dialogs/operator-seat-dialog/operator-seat-dialog.component";
import { CraneOilcoolerDialogComponent } from "../dialogs/crane-oilcooler-dialog/crane-oilcooler-dialog.component";
import { RotatorBrakesDialogComponent } from "../dialogs/rotator-brakes-dialog/rotator-brakes-dialog.component";
import { JoystickHolderDialogComponent } from "../dialogs/joystick-holder-dialog/joystick-holder-dialog.component";

@Component({
    selector: 'app-palms-crane',
    standalone: true,
    templateUrl: './palms-crane.component.html',
    styleUrl: './palms-crane.component.css',
    imports: [FormsModule, ReactiveFormsModule, AccordionModule, CheckboxModule, NavigationComponent, FooterComponent, PalmsCraneInformationComponent, CommonModule, ListboxModule, AccessoryItemComponent, FormatPricePipe, FrameTypesDialogComponent, ControlBlocksDialogComponent, RotatorsDialogComponent, GrapplesDialogComponent, WinchesDialogComponent, ProtectionSleevesDialogComponent, ElectricalFloatingDialogComponent, ValveBlockDialogComponent, DampingsDialogComponent, CraneLightDialogComponent, OperatorSeatDialogComponent, CraneOilcoolerDialogComponent, RotatorBrakesDialogComponent, JoystickHolderDialogComponent]
})
export class PalmsCraneComponent implements OnInit {
    crane!: PalmsCrane
    private id = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;

    trailerSelected: boolean = false;
    craneSelected: boolean = false;
    frameTypeSelected: boolean = false;
    hintsChecked: boolean = true;

    @ViewChild('grappleListBox') grappleListBox!: Dropdown;
    @ViewChild('winchListBox') winchListBox!: Dropdown;
    @ViewChildren('grappleListBoxes') grappleListBoxes!: QueryList<Dropdown>;
    @ViewChild('electricalFloatingCheckBox') electricalFloatingCheckBox!: Checkbox;
    @ViewChild('valveBlockCheckBox') valveBlockCheckBox!: Checkbox;
    @ViewChild('operatorSeatCheckBox') operatorSeatCheckBox!: Checkbox;
    @ViewChild('joystickHolderCheckBox') joystickHolderCheckBox!: Checkbox;

    showControlBlocksDialog: boolean = false;
    showFrameTypesDialog: boolean = false;
    showRotatorsDialog: boolean = false;
    showGrapplesDialog: boolean = false;
    showWinchesDialog: boolean = false;
    showProtectionSleevesDialog: boolean = false;
    showElectricalFloatingDialog: boolean = false;
    showValveBlockDialog: boolean = false;
    showDampingsDialog: boolean = false;
    showLightDialog: boolean = false;
    showOperatorSeatDialog: boolean = false;
    showOilCoolerDialog: boolean = false;
    showRotatorBrakesDialog: boolean = false;
    showJoystickHolderDialog: boolean = false;
    showHoseGuardsDialog: boolean = false;
    showTurningDeviceCounterPlateDialog: boolean = false;
    showSupportLegCounterPlateDialog: boolean = false;
    showBoomGuardsDialog: boolean = false;
    showCoverDialog: boolean = false;
    showWoodControlDialog: boolean = false;
    showLinkageDialog: boolean = false;

    controlBlocks: ConfigurationItem[] = [];
    frameTypes: FrameType[] = [];
    rotators: ConfigurationItem[] = [];
    grapples: ConfigurationItem[] = [];
    winches: ConfigurationItem[] = [];
    protectionSleeves: ConfigurationItem | undefined = undefined;
    electricalFloating: ConfigurationItem | undefined = undefined;
    valveBlock: ConfigurationItem | undefined = undefined;
    dampings: ConfigurationItem[] = [];
    light: ConfigurationItem | undefined = undefined;
    operatorSeat: ConfigurationItem | undefined = undefined;
    oilCooler: ConfigurationItem | undefined = undefined;
    rotatorBrakes: ConfigurationItem[] = [];
    joystickHolder: ConfigurationItem | undefined = undefined;
    hoseGuards: ConfigurationItem[] = [];
    turningDeviceCounterPlates: ConfigurationItem[] = [];
    supportLegCounterPlates: ConfigurationItem[] = [];
    boomguards: ConfigurationItem[] = [];
    covers: ConfigurationItem[] = [];
    woodControls: ConfigurationItem[] = [];
    linkage: ConfigurationItem[] = [];

    originalControlBlockPrice = 0;
    originalFrameTypePrice = 0;
    originalRotatorPrice = 0;
    originalGrapplePrice = 0;
    originalGrapplePrices: number[] = [];
    originalWinchPrice = 0;
    originalProtectionSleevesPrice = 0;
    originalOilTankCoolerPrice = 0;
    originalElectricalFloatingPrice = 0;
    originalValveBlockPrice = 0;
    originalDampingPrice = 0;
    originalLightPrice = 0;
    originalOperatorSeatPrice = 0;
    originalUnderrunProtectionPrice = 0;
    originalOilCoolerPrice = 0;
    originalRotatorBrakePrice = 0;
    originalJoystickHolderPrice = 0;
    originalHoseGuardPrice = 0;
    originalTurningDeviceCounterPlatePrice = 0;
    originalSupportLegCounterPlatePrice = 0;
    originalBoomguardPrice = 0;
    originalCoverPrice = 0;
    originalWoodControlPrice = 0;
    originalLinkagePrice = 0;

    originalControlBlock: ConfigurationItem | undefined = undefined;
    originalFrameType: ConfigurationItem | undefined = undefined;
    originalRotator: ConfigurationItem | undefined = undefined;
    originalGrapple: ConfigurationItem | undefined = undefined;
    originalGrapples: (ConfigurationItem | undefined)[] = [];
    originalWinch: ConfigurationItem | undefined = undefined;
    originalProtectionSleeves: ConfigurationItem | undefined = undefined;
    originalElectricalFloating: ConfigurationItem | undefined = undefined;
    originalValveBlock: ConfigurationItem | undefined = undefined;
    originalDamping: ConfigurationItem | undefined = undefined;
    originalLight: ConfigurationItem | undefined = undefined;
    originalOperatorSeat: ConfigurationItem | undefined = undefined;
    originalOilCooler: ConfigurationItem | undefined = undefined;
    originalRotatorBrake: ConfigurationItem | undefined = undefined;
    originalJoystickHolder: ConfigurationItem | undefined = undefined;
    originalHoseGuard: ConfigurationItem | undefined = undefined;
    originalTurningDeviceCounterPlate: ConfigurationItem | undefined = undefined;
    originalSupportLegCounterPlate: ConfigurationItem | undefined = undefined;
    originalBoomguard: ConfigurationItem | undefined = undefined;
    originalCover: ConfigurationItem | undefined = undefined;
    originalWoodControl: ConfigurationItem | undefined = undefined;
    originalLinkage: ConfigurationItem | undefined = undefined;

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
        selectedWinch: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedProtectionSleeves: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedElectricalFloating: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedValveBlock: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedDamping: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedLight: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedOperatorSeat: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedOilCooler: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedRotatorBrake: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedJoystickHolder: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedHoseGuard: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedTurningDeviceCounterPlate: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedSupportLegCounterPlate: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedBoomguard: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedCover: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedWoodControl: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
        selectedLinkage: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    });

    private initializeFormGroup(): void {
        this.craneFormGroup = this.fb.group({
            selectedCrane: null,
            selectedControlBlock: [],
            selectedFrameType: [],
            selectedGrapples: this.fb.array([]),
            selectedRotator: [],
            selectedGrapple: [],
            selectedWinch: [],
            selectedProtectionSleeves: null,
            selectedElectricalFloating: [{ value: null, disabled: true}],
            selectedValveBlock: [{value: null, disabled: true}],
            selectedDamping: [],
            selectedLight: [],
            selectedOperatorSeat: [{value: null, disabled: true}],
            selectedOilCooler: [],
            selectedRotatorBrake: [],
            selectedJoystickHolder: [{value: null, disabled: true}],
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
        const controlBlocks$ = this.palmsCraneConfigService.getControlBlocks(this.id);
        const frameTypes$ = this.palmsCraneConfigService.getFrameTypes(this.id);
        const rotators$ = this.palmsCraneConfigService.getRotators(this.id);
        const grapples$ = this.palmsCraneConfigService.getGrapples(this.id);
        const winches$ = this.palmsCraneConfigService.getWinches(this.id);
        const protectionSleeves$ = this.palmsCraneConfigService.getProtectionSleeves(this.id);
        const electricalFloating$ = this.palmsCraneConfigService.getElectricalFloating(this.id);
        const valveBlock$ = this.palmsCraneConfigService.getValveBlock(this.id);
        const dampings$ = this.palmsCraneConfigService.getDampings(this.id);
        const light$ = this.palmsCraneConfigService.getLight(this.id);
        const operatorSeat$ = this.palmsCraneConfigService.getOperatorSeat(this.id);
        const oilCooler$ = this.palmsCraneConfigService.getOilCooler(this.id);
        const rotatorBrakes$ = this.palmsCraneConfigService.getRotatorBrakes(this.id);
        const joystickHolder$ = this.palmsCraneConfigService.getJoystickHolder(this.id);
        
        const request = forkJoin([controlBlocks$, frameTypes$, rotators$, grapples$, winches$, 
          protectionSleeves$, electricalFloating$, valveBlock$, dampings$, light$,
          operatorSeat$, oilCooler$, rotatorBrakes$, joystickHolder$]);
       
        request.subscribe(([controlBlocks, frameTypes, rotators, grapples, winches, 
          protectionSleeves, electricalFloating, valveBlock, dampings, light,
          operatorSeat, oilCooler, rotatorBrakes, joystickHolder]) => {
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

            if(winches){
              this.winches = winches.map((winch) => ({
                ...winch,
                disabledOption:  winch.id === 2 || winch.id === 3
              }));
              console.log(winches); 
            }

            if (protectionSleeves){
              this.protectionSleeves = protectionSleeves;
              console.log(protectionSleeves);
            }

            if (electricalFloating){
                this.electricalFloating = electricalFloating;
                console.log(electricalFloating);
            }

            if (valveBlock){
              this.valveBlock = valveBlock;
              console.log(valveBlock);
            }

            if(dampings){
              this.dampings = dampings;
              console.log(dampings); 
            }

            if (light){
              this.light = light;
              console.log(light);
            }

            if (operatorSeat){
              this.operatorSeat = operatorSeat;
              console.log(operatorSeat);
            }

            if (oilCooler){
              this.oilCooler = oilCooler;
              console.log(oilCooler);
            }

            if(rotatorBrakes){
              this.rotatorBrakes = rotatorBrakes;
              console.log(rotatorBrakes); 
            }

            if (joystickHolder){
              this.joystickHolder = joystickHolder;
              console.log(joystickHolder);
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
      let updatedWinches: ConfigurationItem[] = [];
    
      if (event.value) {
        this.originalControlBlock = event.value;
    
        // frame types
        if (event.value.id < 8) {
          updatedFrameTypes = this.updateFrameTypesForControlBlock();
        } else {
          updatedFrameTypes = this.updateFrameTypesToEnabled();
        }
    
        // winches and electrical floating
        if (5 < event.value.id && event.value.id < 14) {
          updatedWinches = this.updateWinchesToEnabled();
          this.craneFormGroup.get('selectedElectricalFloating')?.enable();
        } else {
          updatedWinches = this.updateWinchesForControlBlock();
          this.setElectricalFloatingDefault();
        }

        // valve block
        if (7 < event.value.id && event.value.id < 14) {
          this.craneFormGroup.get('selectedValveBlock')?.enable();
        } else {
          this.setValveBlockDefault();
        }

        // operator seat
        if (event.value.id === 6) {
          this.craneFormGroup.get('selectedOperatorSeat')?.enable();
        } else {
          this.setOperatorSeatDefault();
        }

        // joystick holder
        if (5 < event.value.id && event.value.id < 15) {
          console.log('joystick h');
          
          this.craneFormGroup.get('selectedJoystickHolder')?.enable();
        } else {
          this.setJoystickHolderDefault();
        }

      } else {
        this.originalControlBlock = undefined;
    
        updatedFrameTypes = this.updateFrameTypesToEnabled();
        updatedWinches = this.updateWinchesForControlBlock();
        this.setElectricalFloatingDefault();
        this.setValveBlockDefault();
        this.setOperatorSeatDefault();
        this.setJoystickHolderDefault();
    
        // winches
        if (this.originalWinch && (this.originalWinch.id === 2 || this.originalWinch.id === 3)) {
          this.setWinchToDefault();
        }
      }
    
      this.frameTypes = updatedFrameTypes;
      this.winches = updatedWinches;
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

    updateWinchesForControlBlock(): ConfigurationItem[] {
      return this.winches.map((winch) => ({
        ...winch,
        disabledOption: winch.code === "W1" || winch.code === "W2"
      }));
    }

    updateWinchesToEnabled(): ConfigurationItem[] {
      return this.winches.map((winch) => ({
        ...winch,
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

          if(this.originalGrapple?.id === 2) {
            this.setGrappleToDefault();
          }

          this.setGrapplesToDefault();
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

    setGrappleToDefault(){
      if(this.originalGrapple && this.originalGrapple.price){
        this.palmsService._cranePrice.update(value => value - Number(this.originalGrapple?.price))
        this.grappleListBox.writeValue(undefined);
        this.originalGrapple = undefined;
        this.originalGrapplePrice = 0;
      }
    }

    setGrapplesToDefault(){
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

    handleWinchChange(event: ListboxChangeEvent) {
      const previousValue = this.originalWinchPrice
      this.originalWinchPrice = event.value ? event.value.price : 0;
      const nextValue = this.originalWinchPrice
      const current = this.palmsService._cranePrice();
      
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      if (event.value){
        this.originalWinch = event.value;
      } else {
        this.originalWinch = undefined;
      }
    }

    setWinchToDefault(){
      if(this.originalWinch && this.originalWinch.price){
        this.palmsService._cranePrice.update(value => value - Number(this.originalWinch?.price))
        this.winchListBox.writeValue(undefined);
        this.originalWinch = undefined;
        this.originalWinchPrice = 0;
      }
      
    }

    onProtectionSleevesChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalProtectionSleevesPrice = Number(event.checked[0].price);
        this.originalProtectionSleeves = event.checked[0];
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalProtectionSleevesPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalProtectionSleeves = undefined;
      }
    }

    onElectricalFloatingChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalElectricalFloatingPrice = Number(event.checked[0].price);
        this.originalElectricalFloating = event.checked[0];
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalElectricalFloatingPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalElectricalFloating = undefined;
      }
    }

    setElectricalFloatingDefault(){
      if(this.originalElectricalFloating && this.originalElectricalFloating.price){
        this.palmsService._cranePrice.update(value => value - Number(this.originalElectricalFloating?.price))
        this.electricalFloatingCheckBox.writeValue(undefined);
        this.originalElectricalFloating = undefined;
        this.originalElectricalFloatingPrice = 0;
      }
      this.craneFormGroup.get('selectedElectricalFloating')?.disable();
    }

    onValveBlockChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalValveBlockPrice = Number(event.checked[0].price);
        this.originalValveBlock = event.checked[0];
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalValveBlockPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalValveBlock = undefined;
      }
    }

    setValveBlockDefault(){
      if(this.originalValveBlock && this.originalValveBlock.price){ 
        this.palmsService._cranePrice.update(value => value - Number(this.originalValveBlock?.price))
        this.valveBlockCheckBox.writeValue(undefined);
        this.originalValveBlock = undefined;
        this.originalValveBlockPrice = 0;
      }
      this.craneFormGroup.get('selectedValveBlock')?.disable();
    }

    handleDampingChange(event: ListboxChangeEvent) {
      const previousValue = this.originalDampingPrice
      this.originalDampingPrice = event.value ? event.value.price : 0;
      const nextValue = this.originalDampingPrice
      const current = this.palmsService._cranePrice();
      
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      if (event.value){
        this.originalDamping = event.value;
      } else {
        this.originalDamping = undefined;
      }
    }

    onLightChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalLightPrice = Number(event.checked[0].price);
        this.originalLight = event.checked[0];
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalLightPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalLight = undefined;
      }
    }

    onOperatorSeatChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalOperatorSeatPrice = Number(event.checked[0].price);
        this.originalOperatorSeat = event.checked[0];
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalOperatorSeatPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalOperatorSeat = undefined;
      }
    }

    setOperatorSeatDefault(){
      if(this.originalOperatorSeat && this.originalOperatorSeat.price){
        this.palmsService._cranePrice.update(value => value - Number(this.originalOperatorSeat?.price))
        this.operatorSeatCheckBox.writeValue(undefined);
        this.originalOperatorSeat = undefined;
        this.originalOperatorSeatPrice = 0;
      }
      this.craneFormGroup.get('selectedOperatorSeat')?.disable();
    }

    onOilCoolerChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalOilCoolerPrice = Number(event.checked[0].price);
        this.originalOilCooler = event.checked[0];
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalOilCoolerPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalOilCooler = undefined;
      }
    }

    handleRotatorBrakeChange(event: ListboxChangeEvent) {
      const previousValue = this.originalRotatorBrakePrice
      this.originalRotatorBrakePrice = event.value ? event.value.price : 0;
      const nextValue = this.originalRotatorBrakePrice
      const current = this.palmsService._cranePrice();
      
      if (previousValue !== nextValue) {
        const newPrice = current - previousValue + Number(nextValue);
        this.palmsService._cranePrice.set(newPrice);
      }
    
      if (event.value){
        this.originalRotatorBrake = event.value;
      } else {
        this.originalRotatorBrake = undefined;
      }
    }

    onJoystickHolderChange(event: CheckboxChangeEvent){
      if (event.checked.length > 0) {
        const current = this.palmsService._cranePrice();
        const newPrice = current + Number(event.checked[0].price);
        this.palmsService._cranePrice.set(newPrice);
        this.originalJoystickHolderPrice = Number(event.checked[0].price);
        this.originalJoystickHolder = event.checked[0];
      } else {
        const current = this.palmsService._cranePrice();
        const newPrice = current - this.originalJoystickHolderPrice;
        this.palmsService._cranePrice.set(newPrice);
        this.originalJoystickHolder = undefined;
      }
    }

    // if(this.originalOperatorSeat && this.originalOperatorSeat.price){
    //   this.craneFormGroup.get('selectedOperatorSeat')?.disable();
    //   this.palmsService._cranePrice.update(value => value - Number(this.originalOperatorSeat?.price))
    //   this.operatorSeatCheckBox.writeValue(undefined);
    //   this.originalOperatorSeat = undefined;
    //   this.originalOperatorSeatPrice = 0;
    // }
    setJoystickHolderDefault(){
      if(this.originalJoystickHolder && this.originalJoystickHolder.price){ 
        this.palmsService._cranePrice.update(value => value - Number(this.originalJoystickHolder?.price))
        this.joystickHolderCheckBox.writeValue(undefined);
        this.originalJoystickHolder = undefined;
        this.originalJoystickHolderPrice = 0;
      }
      this.craneFormGroup.get('selectedJoystickHolder')?.disable();
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
        this.originalWinch = undefined;
        this.originalProtectionSleeves = undefined;
        this.originalElectricalFloating = undefined;
        this.originalValveBlock = undefined;
        this.originalDamping = undefined;
        this.originalLight = undefined;
        this.originalOperatorSeat = undefined;
        this.originalOilCooler = undefined;
        this.originalRotatorBrake = undefined;
        this.originalJoystickHolder = undefined;
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
            case 'winches':
                this.showWinchesDialog = show;
                break;
            case 'protectionSleeves':
                this.showProtectionSleevesDialog = show;
                break;
            case 'electricalFloating':
                this.showElectricalFloatingDialog = show;
                break;
            case 'valveBlock':
                this.showValveBlockDialog = show;
                break;    
            case 'dampings':
                this.showDampingsDialog = show;
                break;    
            case 'light':
                this.showLightDialog = show;
                break;    
            case 'operatorSeat':
                this.showOperatorSeatDialog = show;
                break;    
            case 'oilCooler':
                this.showOilCoolerDialog = show;
                break;    
            case 'rotatorBrakes':
                this.showRotatorBrakesDialog = show;
                break;    
            case 'joystickHolder':
                this.showJoystickHolderDialog = show;
                break;    
            default:
              break;
          }
      }
}
