import { Component, OnInit, ViewChild } from '@angular/core';
import { PalmsService } from '../../../shared/services/palms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationComponent } from "../../../../../navigation/navigation.component";
import { FooterComponent } from "../../../../../footer/footer.component";
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ListboxChangeEvent, ListboxModule } from 'primeng/listbox';
import { ImageModule } from 'primeng/image';
import { ConfigurationItem } from '../../../../../../models/configuration-item';
import { PalmsTrailerConfigService } from '../../services/palms-trailer-config.service';
import { FormatPricePipe } from "../../../../../pipes/format-price.pipe";
import { forkJoin } from 'rxjs';
import { BrakesDialogComponent } from "../dialogs/brakes-dialog/brakes-dialog.component";
import { DrawbarDialogComponent } from "../dialogs/drawbar-dialog/drawbar-dialog.component";
import { PlatormDialogComponent } from '../dialogs/platorm-dialog/platorm-dialog.component';
import { OilPumpDialogComponent } from '../dialogs/oil-pump-dialog/oil-pump-dialog.component';
import { Checkbox, CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { OilTankDialogComponent } from '../dialogs/oil-tank-dialog/oil-tank-dialog.component';
import { OilTankCoolerDialogComponent } from "../dialogs/oil-tank-cooler-dialog/oil-tank-cooler-dialog.component";
import { BolsterLockDialogComponent } from "../dialogs/bolster-lock-dialog/bolster-lock-dialog.component";
import { BboxDialogComponent } from "../dialogs/bbox-dialog/bbox-dialog.component";
import { WoodsorterDialogComponent } from "../dialogs/woodsorter-dialog/woodsorter-dialog.component";
import { ChainsawHolderDialogComponent } from "../dialogs/chainsaw-holder-dialog/chainsaw-holder-dialog.component";
import { UnderrunProtectionDialogComponent } from "../dialogs/underrun-protection-dialog/underrun-protection-dialog.component";
import { SupportLegDialogComponent } from "../dialogs/support-leg-dialog/support-leg-dialog.component";
import { LightDialogComponent } from "../dialogs/light-dialog/light-dialog.component";
import { TyresDialogComponent } from "../dialogs/tyres-dialog/tyres-dialog.component";
import { LoadingService } from '../../../../../../services/loading.service';
import { PalmsTrailerCalculatorHintsComponent } from '../palms-trailer-calculator-hints/palms-trailer-calculator-hints.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { AccessoryItemComponent } from "../../../shared/components/accessory-item/accessory-item.component";
import { TrailerDataItemComponent } from '../../../shared/components/machine-data-item/machine-data-item.component';
import { CardModule } from 'primeng/card';
import { PalmsTrailer } from '../../models/palms-trailer';
import { PalmsTrailerInformationComponent } from "../palms-trailer-information/palms-trailer-information.component";
import { PalmsTrailerCardsComponent } from "../palms-trailer-cards/palms-trailer-cards.component";
import { PalmsCranesCardsComponent } from "../../../cranes/components/palms-cranes-cards/palms-crane-cards.component";
import { PalmsCraneConfigService } from '../../../cranes/services/palms-crane-config.service';

@Component({
    selector: 'app-palms-trailer',
    standalone: true,
    providers: [PalmsService],
    templateUrl: './palms-trailer.component.html',
    styleUrl: './palms-trailer.component.css',
    imports: [NavigationComponent, CardModule, FooterComponent, TrailerDataItemComponent, AccordionModule, DividerModule, DropdownModule, InputSwitchModule, GalleriaModule, FormsModule, ReactiveFormsModule, ButtonModule, ImageModule, ListboxModule, FormatPricePipe, BrakesDialogComponent, DrawbarDialogComponent, PlatormDialogComponent, OilPumpDialogComponent, OilTankDialogComponent, CheckboxModule, OilTankCoolerDialogComponent, BolsterLockDialogComponent, BboxDialogComponent, WoodsorterDialogComponent, ChainsawHolderDialogComponent, UnderrunProtectionDialogComponent, SupportLegDialogComponent, LightDialogComponent, TyresDialogComponent, PalmsTrailerCalculatorHintsComponent, AccessoryItemComponent, PalmsTrailerInformationComponent, PalmsTrailerCardsComponent, PalmsCranesCardsComponent]
})
export class PalmsTrailerComponent implements OnInit{
  trailer!: PalmsTrailer
  private id = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
  trailerSelected: boolean = false;
  craneSelected: boolean = false;
  hintsChecked: boolean = true;
  woodSorterChecked: boolean = false;
  woodSorterNumberSelected: boolean = false;

  @ViewChild('oilTankCoolerCheckBox') oilTankCoolerCheckBox!: Checkbox;
  @ViewChild('woodSorterCheckBox') woodSorterCheckBox!: Checkbox;
  @ViewChild('woodSorterDropdown') woodSorterDropdown!: Dropdown;
 
  showBrakesDialog: boolean = false;
  showPropulsionsDialog: boolean = false;
  showDrawbarsDialog: boolean = false;
  showPlatformsDialog: boolean = false;
  showOilPumpsDialog: boolean = false;
  showOilTanksDialog: boolean = false;
  showOilTankCoolersDialog: boolean = false;
  showBolsterLockDialog: boolean = false;
  showBboxDialog: boolean = false;
  showWoodSorterDialog: boolean = false;
  showHandBrakeDialog: boolean = false;
  showChainsawHolderDialog: boolean = false;
  showUnderrunProtectionDialog: boolean = false;
  showSupportLegDialog: boolean = false;
  showLightsDialog: boolean = false;
  showTyresDialog: boolean = false;

  stanchions: ConfigurationItem[] = [];
  brakes: ConfigurationItem[] = [];
  propulsions: ConfigurationItem[] = [];
  drawbars: ConfigurationItem[] = [];
  platforms: ConfigurationItem[] = [];
  oilPumps: ConfigurationItem[] = [];
  oilTanks: ConfigurationItem[] = [];
  bolsterLock: ConfigurationItem | undefined = undefined;
  bbox: ConfigurationItem | undefined = undefined;
  woodSorter: ConfigurationItem | undefined = undefined;
  handBrake: ConfigurationItem | undefined = undefined;
  chainsawHolder: ConfigurationItem | undefined = undefined;
  underrunProtection: ConfigurationItem | undefined = undefined;
  supportLegs: ConfigurationItem[] = [];
  lights: ConfigurationItem[] = [];
  tyres: ConfigurationItem[] = [];

  selectedConfigurationItems: ConfigurationItem[] = [];

  originalStanchionPrice = 0;
  originalBrakePrice = 0;
  originalPropulsionPrice = 0;
  originalDrawbarPrice = 0;
  originalPlatformPrice = 0;
  originalOilPumpPrice = 0;
  originalOilTankPrice = 0;
  originalOilTankCoolerPrice = 0;
  originalBolsterLockPrice = 0;
  originalBboxPrice = 0;
  originalWoodSorterPrice = 0;
  originalHandBrakePrice = 0;
  originalChainsawHolderPrice = 0;
  originalUnderrunProtectionPrice = 0;
  originalSupportLegPrice = 0;
  originalLightPrice = 0;
  originalTyrePrice = 0;

  initialWoodSorterPrice = 0;
  initialWoodSorterNumber = 0;
  previousWoodSorterNumber = 0;
  initialTrailerPrice = 0;

  originalStanchion: ConfigurationItem | undefined = undefined;
  originalBrake: ConfigurationItem | undefined = undefined;
  originalPropulsion: ConfigurationItem | undefined = undefined;
  originalDrawbar: ConfigurationItem | undefined = undefined;
  originalPlatform: ConfigurationItem | undefined = undefined;
  originalOilPump: ConfigurationItem | undefined = undefined;
  originalOilTank: ConfigurationItem | undefined = undefined;
  originalOilTankCooler: ConfigurationItem | undefined = undefined;
  originalBolsterLock: ConfigurationItem | undefined = undefined;
  originalBbox: ConfigurationItem | undefined = undefined;
  originalWoodSorter: ConfigurationItem | undefined = undefined;
  woodSorterArrayElements: any[] | undefined = [];
  originalHandBrake: ConfigurationItem | undefined = undefined;
  originalChainsawHolder: ConfigurationItem | undefined = undefined;
  originalUnderrunProtection: ConfigurationItem | undefined = undefined;
  originalSupportLeg: ConfigurationItem | undefined = undefined;
  originalLight: ConfigurationItem | undefined = undefined;
  originalTyre: ConfigurationItem | undefined = undefined;

  trailerFormGroup: FormGroup = new FormGroup({
    selectedTrailer: new FormControl<string>(''),
    selectedStanchion: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedBrake: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedPropulsion: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedDrawbar: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedPlatform: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedOilPump: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedOilTank: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedOilTankCooler: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedBolsterLock: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedBbox: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedWoodSorter: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedHandBrake: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedChainsawHolder: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedUnderrunProtection: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedSupportLeg: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedLight: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''}),
    selectedTyre: new FormControl<ConfigurationItem>({id: 0, name: '', code: '', price: 0, namePrice: ''})
  });

  craneFormGroup: FormGroup = new FormGroup({
    selectedCrane: new FormControl<string>(''),
  });

  private initializeFormGroup(): void {
    
    this.trailerFormGroup = this.fb.group({
      selectedTrailer: [this.trailer.name],
      selectedStanchion: [this.stanchions[0]],
      selectedBrake: [this.brakes[0]],
      selectedPropulsion: [this.propulsions[0]],
      selectedDrawbar: [this.drawbars[0]],
      selectedPlatform: [this.platforms[0]],
      selectedOilPump: [this.oilPumps[0]],
      selectedOilTank: [this.oilTanks[0]],
      selectedOilTankCooler: null,
      selectedBolsterLock: null,
      selectedBbox: null,
      selectedWoodSorter: null,
      selectedHandBrake: null,
      selectedChainsawHolder: null,
      selectedUnderrunProtection: null,
      selectedSupportLeg: [this.supportLegs[0]],
      selectedLight: [this.lights[0]],
      selectedTyre: [this.tyres[0]],
      selectedCrane: null,
    });

    this.craneFormGroup = this.fb.group({
      selectedCrane: null,
    });
  }   

  constructor(
    readonly palmsService: PalmsService,
    private palmsTrailerConfigService: PalmsTrailerConfigService,
    private palmsCraneConfigService: PalmsCraneConfigService,
    readonly loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.palmsService.getTrailer(this.id).pipe().subscribe((response) => {
      this.trailer = response as PalmsTrailer; 
    })  

  }

  getCranes(){
    const craneNames = this.trailer.crane.map((crane) => crane.name);
    return craneNames;
  }

  loadTrailerConfigurations(){  
    this.loadingService.enableLoader();
    const stanchions$ = this.palmsTrailerConfigService.getStanchions(this.id);
    const brakes$ = this.palmsTrailerConfigService.getBrakes(this.id);
    const propulsions$ = this.palmsTrailerConfigService.getPropulsions(this.id);
    const drawbars$ = this.palmsTrailerConfigService.getDrawbars(this.id);
    const platforms$ = this.palmsTrailerConfigService.getPlatforms(this.id);
    const oilPumps$ = this.palmsTrailerConfigService.getOilPumps(this.id);
    const oilTanks$ = this.palmsTrailerConfigService.getOilTanks(this.id);
    const bolsterLock$ = this.palmsTrailerConfigService.getBolsterLock(this.id);
    const bbox$ = this.palmsTrailerConfigService.getBBox(this.id);
    const woodSorter$ = this.palmsTrailerConfigService.getWoodSorter(this.id);
    const handBrake$ = this.palmsTrailerConfigService.getHandBrake(this.id);
    const chainsawHolder$ = this.palmsTrailerConfigService.getChainsawHolder(this.id);
    const underrunProtection$ = this.palmsTrailerConfigService.getUnderrunProtection(this.id);
    const supportLegs$ = this.palmsTrailerConfigService.getSupportLegs(this.id);
    const lights$ = this.palmsTrailerConfigService.getLights(this.id);
    const tyres$ = this.palmsTrailerConfigService.getTyres(this.id);
    
    const request = forkJoin([stanchions$, brakes$, propulsions$, drawbars$, platforms$, oilPumps$, oilTanks$, bolsterLock$, bbox$, woodSorter$, handBrake$, chainsawHolder$, underrunProtection$, supportLegs$, lights$, tyres$]);
   
    request.subscribe(([stanchions, brakes, propulsions, drawbars, platforms, oilPumps, oilTanks, bolsterLock, bbox, woodSorter, handBrake, chainsawHolder, underrunProtection, supportLegs, lights, tyres]) => {
      if (stanchions.length > 0){
        this.stanchions = stanchions;
        this.palmsService._trailerPrice.update(value => value + Number(stanchions[0].price))
        this.originalStanchion = stanchions[0];
        this.originalStanchionPrice = stanchions[0].price;
      }
      
      if (brakes.length > 0){
        this.brakes = brakes;
        this.palmsService._trailerPrice.update(value => value + Number(brakes[0].price))
        this.originalBrake = brakes[0];
      }
      
      if (propulsions.length > 0){
        this.propulsions = propulsions;
        this.palmsService._trailerPrice.update(value => value + Number(propulsions[0].price))
        this.originalPropulsion = propulsions[0];
        this.originalPropulsionPrice = propulsions[0].price;
      }
      
      if (drawbars.length > 0){
        this.drawbars = drawbars;
        this.palmsService._trailerPrice.update(value => value + Number(drawbars[0].price))
        this.originalDrawbar = drawbars[0];
        this.originalDrawbarPrice = drawbars[0].price;
      }

      if (platforms.length > 0){
        this.platforms = platforms;
        this.palmsService._trailerPrice.update(value => value + Number(platforms[0].price))
        this.originalPlatform = platforms[0];
        this.originalPlatformPrice = platforms[0].price;
      }    

      if (oilPumps.length > 0){
        this.oilPumps = oilPumps;
        this.palmsService._trailerPrice.update(value => value + Number(oilPumps[0].price))
        this.originalOilPump = oilPumps[0];
        this.originalOilPumpPrice = oilPumps[0].price;
      }    

      if (oilTanks.length > 0){
        this.oilTanks = oilTanks;
        this.palmsService._trailerPrice.update(value => value + Number(oilTanks[0].price))
        this.originalOilTank = oilTanks[0];
        this.originalOilTankPrice = oilTanks[0].price;
      }

      if (bolsterLock){
        this.bolsterLock = bolsterLock;

      }

      if (bbox){
        this.bbox = bbox;

      }

      if (woodSorter){
        this.woodSorter = woodSorter;
        this.initialWoodSorterPrice = woodSorter.price;

      }

      if (handBrake){
        this.handBrake = handBrake;

      }

      if (chainsawHolder){
        this.chainsawHolder = chainsawHolder;

      }

      if (underrunProtection){
        this.underrunProtection = underrunProtection;

      }

      if (supportLegs.length > 0){
        this.supportLegs = supportLegs;
        this.palmsService._trailerPrice.update(value => value + Number(supportLegs[0].price))
        this.originalSupportLeg = supportLegs[0];
        this.originalSupportLegPrice = supportLegs[0].price;
      }

      if (lights.length > 0){
        this.lights = lights;
        this.palmsService._trailerPrice.update(value => value + Number(lights[0].price))
        this.originalLight = lights[0];
        this.originalLightPrice = lights[0].price;
      }

      if (tyres.length > 0){
        this.tyres = tyres;
        this.palmsService._trailerPrice.update(value => value + Number(tyres[0].price))
        this.originalTyre = tyres[0];
        this.originalTyrePrice = tyres[0].price;
      }
      
      this.initializeFormGroup();
      this.trailerSelected = true;
    }).add(() => this.loadingService.disableLoader());
  }

  handleStanchionChange(event: ListboxChangeEvent) {
    const previousValue = this.originalStanchionPrice;
    this.originalStanchionPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalStanchionPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalStanchion = event.value;
    } else {
      this.originalStanchion = undefined;
    }

    const maxNumber = Number(this.originalStanchion?.code[1]) * 2;
    this.woodSorterArrayElements = [];
    if(this.originalStanchion) this.initialTrailerPrice = Number(this.originalStanchion!.price);
    this.originalWoodSorter = undefined;

    setTimeout(() => {
      if(this.woodSorterCheckBox){
        this.woodSorterCheckBox.writeValue(false);
        this.woodSorterChecked = false;

        for (let i = 1; i <= maxNumber; i++) {
          this.woodSorterArrayElements?.push({number: i});  
        }
      }
      
    },50);
    
    if(this.initialWoodSorterNumber > 0){
      this.palmsService._trailerPrice.update(value => value - (Number(this.initialWoodSorterNumber * 65)))
      this.initialWoodSorterNumber = 0;
      this.previousWoodSorterNumber = 0;
    }
  }

  handleBrakeChange(event: ListboxChangeEvent) {
    const previousValue = this.originalBrakePrice;
    this.originalBrakePrice = event.value ? event.value.price : 0;
    const nextValue = this.originalBrakePrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalBrake = event.value;
    } else {
      this.originalBrake = undefined;
    }
  }

  handlePropulsionChange(event: ListboxChangeEvent) {
    const previousValue = this.originalPropulsionPrice
    this.originalPropulsionPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalPropulsionPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalPropulsion = event.value;
    } else {
      this.originalPropulsion = undefined;
    }
  }

  handleDrawbarChange(event: ListboxChangeEvent) {
    const previousValue =  this.originalDrawbarPrice;
    this.originalDrawbarPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalDrawbarPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalDrawbar = event.value;
    } else {
      this.originalDrawbar = undefined;
    }
  }

  handlePlatformChange(event: ListboxChangeEvent) {
    const previousValue = this.originalPlatformPrice;
    this.originalPlatformPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalPlatformPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalPlatform = event.value;
    } else {
      this.originalPlatform = undefined;
    }
  }

  handleOilPumpChange(event: ListboxChangeEvent) {
    const previousValue = this.originalOilPumpPrice;
    this.originalOilPumpPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalOilPumpPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalOilPump = event.value;
    } else {
      this.originalOilPump = undefined;
    }
  }

  handleOilTankChange(event: ListboxChangeEvent) {
    const previousValue = this.originalOilTankPrice;
    this.originalOilTankPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalOilTankPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalOilTank = event.value;
    } else {
      this.originalOilTank = undefined;
    } 

    setTimeout(() => {
      if(this.oilTankCoolerCheckBox){
        this.oilTankCoolerCheckBox.writeValue(false);
      }
    },50);
   
    if(this.originalOilTankCooler) this.palmsService._trailerPrice.set(this.palmsService._trailerPrice() - this.originalOilTankCooler.price)
    this.originalOilTankCooler = undefined;
  }

  handleSupportLegChange(event: ListboxChangeEvent) {
    const previousValue = this.originalSupportLegPrice;
    this.originalSupportLegPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalSupportLegPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalSupportLeg = event.value;
    } else {
      this.originalSupportLeg = undefined;
    }
  }

  handleLightChange(event: ListboxChangeEvent) {
    const previousValue = this.originalLightPrice;
    this.originalLightPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalLightPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalLight = event.value;
    } else {
      this.originalLight = undefined;
    }
  }

  handleTyreChange(event: ListboxChangeEvent) {
    const previousValue = this.originalTyrePrice;
    this.originalTyrePrice = event.value ? event.value.price : 0;
    const nextValue = this.originalTyrePrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + Number(nextValue);
      this.palmsService._trailerPrice.set(newPrice);
    }

    if (event.value){
      this.originalTyre = event.value;
    } else {
      this.originalTyre = undefined;
    }
  }

  onOilTankCoolerChange(event: CheckboxChangeEvent){
    console.log(event);

    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = current + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalOilTankCoolerPrice = Number(event.checked[0].price);
      this.originalOilTankCooler = event.checked[0];
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = current - this.originalOilTankCoolerPrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalOilTankCooler = undefined;
    }
  }

  onBolsterLockChange(event: CheckboxChangeEvent){
    console.log(event);

    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = current + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalBolsterLockPrice = Number(event.checked[0].price);
      this.originalBolsterLock = event.checked[0];
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = current - this.originalBolsterLockPrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalBolsterLock = undefined;
    }
  }

  onBBoxChange(event: CheckboxChangeEvent){
    console.log(event);

    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = current + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalBboxPrice = Number(event.checked[0].price);
      this.originalBbox = event.checked[0];
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = current - this.originalBboxPrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalBbox = undefined;
    }
  }

  onWoodSorterChange(event: CheckboxChangeEvent){
    console.log(event);
    if (event.checked.length > 0) {
        this.originalWoodSorterPrice = Number(event.checked[0].price);
        this.woodSorterChecked = true;
        this.originalWoodSorter = event.checked[0];

        setTimeout(() => {
          if(this.woodSorterArrayElements = []){
            const maxNumber = Number(this.originalStanchion?.code[1]) * 2;

            this.woodSorterArrayElements = [];
            for (let i = 1; i <= maxNumber; i++) {
              this.woodSorterArrayElements.push({number: i});
              if (this.originalWoodSorter){
                this.originalWoodSorter.name = this.originalWoodSorter?.name.replace(/\s\d+ db$/, '');
                this.originalWoodSorter.price = 0;
                this.palmsService._trailerPrice.update(value => value + (65* this.initialWoodSorterNumber));
              }
            }
          }
        }, 100);
    } else {
        setTimeout(() => {
          this.palmsService._trailerPrice.update(value => value - (65* this.initialWoodSorterNumber));
          this.woodSorterChecked = false;
          this.initialWoodSorterNumber = 0;
          this.previousWoodSorterNumber = 0;
          this.originalWoodSorter = undefined;
            this.woodSorterArrayElements = []
          }, 50);
    }
  }

  onWoodSorterNumberChange(event: DropdownChangeEvent){
    this.woodSorterNumberSelected = true;
    const number = event.value.number;
    this.initialWoodSorterNumber = number;
    const previousTotalPrice = this.previousWoodSorterNumber * this.initialWoodSorterPrice;

    if (this.originalWoodSorter) {
        this.originalWoodSorter.name = this.originalWoodSorter.name.replace(/\s\d+ db$/, '') + " " + this.initialWoodSorterNumber + " db";
        this.originalWoodSorter.price = this.initialWoodSorterPrice * this.initialWoodSorterNumber;

        this.palmsService._trailerPrice.update(value => value - previousTotalPrice + (this.initialWoodSorterPrice * this.initialWoodSorterNumber));
    } else {
      this.palmsService._trailerPrice.update(value => value + previousTotalPrice + (this.initialWoodSorterPrice * this.initialWoodSorterNumber));
    }
    this.previousWoodSorterNumber = number;
  }

  onHandBrakeChange(event: CheckboxChangeEvent){
    console.log(event);

    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = current + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalHandBrakePrice = Number(event.checked[0].price);
      this.originalHandBrake = event.checked[0];
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = current - this.originalHandBrakePrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalHandBrake = undefined;
    }
  }

  onChainsawHolderChange(event: CheckboxChangeEvent){
    console.log(event);

    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = current + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalChainsawHolderPrice = Number(event.checked[0].price);
      this.originalChainsawHolder = event.checked[0];
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = current - this.originalChainsawHolderPrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalChainsawHolder = undefined;
    }
  }

  onUnderrunProtectionChange(event: CheckboxChangeEvent){
    console.log(event);

    if (event.checked.length > 0) {
      const current = this.palmsService._trailerPrice();
      const newPrice = current + Number(event.checked[0].price);
      this.palmsService._trailerPrice.set(newPrice);
      this.originalUnderrunProtectionPrice = Number(event.checked[0].price);
      this.originalUnderrunProtection = event.checked[0];
    } else {
      const current = this.palmsService._trailerPrice();
      const newPrice = current - this.originalUnderrunProtectionPrice;
      this.palmsService._trailerPrice.set(newPrice);
      this.originalUnderrunProtection = undefined;
    }
  }

  selectCrane(craneId: number){
    const crane$ = this.palmsService.getCrane(craneId);
    const craneFrameTypes$ = this.palmsCraneConfigService.getFrameTypesForTrailerCrane(this.id, craneId)
    
    const request = forkJoin([crane$, craneFrameTypes$]);
   
    request.subscribe(([crane, craneFrameTypes]) => {
      if(crane){
        console.log(crane);
        this.craneFormGroup?.get('selectedCrane')?.setValue(crane.name);
        this.craneSelected = true;
      }
      
      console.log(craneFrameTypes); 
    })
    
  }

  navigateToCrane(craneId: number){
    this.router.navigate(['/calculator/palms/cranes', craneId]);
  }

  toggleDialog(dialogType: string, show: boolean) {
    switch (dialogType) {
        case 'brakes':
            this.showBrakesDialog = show;
            break;
        case 'propulsions':
            this.showPropulsionsDialog = show;
            break;
        case 'drawbars':
          this.showDrawbarsDialog = show;
          break; 
        case 'platforms':
          this.showPlatformsDialog = show;
          break;  
        case 'oilPumps':
          this.showOilPumpsDialog = show;
          break; 
        case 'oilTanks':
          this.showOilTanksDialog = show;
          break;  
        case 'oilTankCoolers':
          this.showOilTankCoolersDialog = show;
          break;
        case 'bolsterLock':
          this.showBolsterLockDialog = show;
          break;
        case 'bbox':
          this.showBboxDialog = show;
          break; 
        case 'woodSorter':
          this.showWoodSorterDialog = show;
          break; 
        case 'handBrake':
          this.showHandBrakeDialog = show;
          break; 
        case 'chainsawHolder':
          this.showChainsawHolderDialog = show;
          break;
        case 'underrunProtection':
          this.showUnderrunProtectionDialog = show;
          break;  
        case 'supportLeg':
          this.showSupportLegDialog = show;
          break; 
        case 'lights':
            this.showLightsDialog = show;
            break;     
        case 'tyres':
            this.showTyresDialog = show;
            break;   
        default:
          break;
      }
  }

  delete() {
    console.log('trailer fg', this.trailerFormGroup.value);
    console.log('crane fg', this.craneFormGroup.value);

    this.trailerSelected = false;
    
    this.palmsService._trailerPrice.set(0);
    this.trailerFormGroup.reset();
    this.originalStanchion = undefined;
    this.originalBrake = undefined;
    this.originalPropulsion = undefined;
    this.originalDrawbar = undefined;
    this.originalPlatform = undefined;
    this.originalOilPump = undefined;
    this.originalOilTank = undefined; 
    this.originalBolsterLock = undefined; 
    this.originalBbox = undefined; 
    this.originalWoodSorter = undefined;
    this.originalHandBrake = undefined;  
    this.originalChainsawHolder = undefined; 
    this.originalUnderrunProtection = undefined;
    this.originalSupportLeg = undefined;
    this.originalLight = undefined;
    this.originalTyre = undefined; 
    this.woodSorterChecked = false;
    this.woodSorterNumberSelected = false;
    this.woodSorterArrayElements = [];
    this.initialWoodSorterNumber = 0;
    this.previousWoodSorterNumber = 0;
  }
}