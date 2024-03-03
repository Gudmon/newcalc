import { PalmsCraneOverview } from './../../../cranes/models/palms-crane-overview';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { Subject, forkJoin, takeUntil } from 'rxjs';
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
import { TrailerLightDialogComponent } from "../dialogs/trailer-light-dialog/trailer-light-dialog.component";
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
import { PalmsCraneConfigService } from '../../../cranes/services/palms-crane-config.service';
import { PalmsTrailerOverview } from '../../models/palms-trailer-overview';
import { PalmsCrane } from '../../../cranes/models/palms-crane';
import { PalmsCraneComponent } from "../../../cranes/components/palms-crane/palms-crane.component";
import { PalmsCraneCardsComponent } from '../../../cranes/components/palms-crane-cards/palms-crane-cards.component';

@Component({
    selector: 'app-palms-trailer',
    standalone: true,
    templateUrl: './palms-trailer.component.html',
    styleUrl: './palms-trailer.component.css',
    imports: [NavigationComponent, CardModule, FooterComponent, PalmsCraneCardsComponent, TrailerDataItemComponent, AccordionModule, DividerModule, DropdownModule, InputSwitchModule, GalleriaModule, FormsModule, ReactiveFormsModule, ButtonModule, ImageModule, ListboxModule, FormatPricePipe, BrakesDialogComponent, DrawbarDialogComponent, PlatormDialogComponent, OilPumpDialogComponent, OilTankDialogComponent, CheckboxModule, OilTankCoolerDialogComponent, BolsterLockDialogComponent, BboxDialogComponent, WoodsorterDialogComponent, ChainsawHolderDialogComponent, UnderrunProtectionDialogComponent, SupportLegDialogComponent, TrailerLightDialogComponent, TyresDialogComponent, PalmsTrailerCalculatorHintsComponent, AccessoryItemComponent, PalmsTrailerInformationComponent, PalmsTrailerCardsComponent, PalmsCraneComponent]
})
export class PalmsTrailerComponent implements OnInit, OnDestroy{
  trailer!: PalmsTrailer
  craneId?: number
  @Input() id?: number;
  fromCrane: boolean = false;
  trailerSelected: boolean = false;
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

  private initializeFormGroup(): void {
    
    this.trailerFormGroup = this.fb.group({
      selectedTrailer: [this.trailer.name],
      selectedStanchion: [this.stanchions[0]],
      selectedBrake: null,
      selectedPropulsion: null,
      selectedDrawbar: null,
      selectedPlatform: null,
      selectedOilPump: null,
      selectedOilTank: null,
      selectedOilTankCooler: null,
      selectedBolsterLock: null,
      selectedBbox: null,
      selectedWoodSorter: null,
      selectedHandBrake: null,
      selectedChainsawHolder: null,
      selectedUnderrunProtection: null,
      selectedSupportLeg: null,
      selectedLight: null,
      selectedTyre: null,
      selectedCrane: null,
    });
  }   
  private destroy$ = new Subject<void>();
  constructor(
    readonly palmsService: PalmsService,
    private palmsTrailerConfigService: PalmsTrailerConfigService,
    readonly loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    if (this.id) {
      this.fromCrane = true;
    } else {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
    }

    this.loadingService.enableLoader();
    this.palmsService.getTrailer(this.id).pipe().subscribe((response) => {
      this.trailer = response as PalmsTrailer; 
    }).add(() => this.loadingService.disableLoader())
    
    if(this.fromCrane){
      this.palmsService.selectedTrailer$
      .pipe(takeUntil(this.destroy$))
      .subscribe((trailer) => {
        this.id = trailer?.id;
        this.loadTrailerConfigurations(this.id!);
      });
    }

    this.palmsService.deleteTrailer$.subscribe(() => { 
      console.log('should not delete');
      
      this.delete();
    })

    this.palmsService.deleteCrane$.subscribe(() => {
      this.palmsService.deleteCrane();
      this.delete();
    })
  }

  getTrailerName(){
    return this.palmsService._selectedTrailer.value?.name
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCranes(){
    const craneNames = this.trailer.crane.map((crane) => crane.name);
    return craneNames;
  }

  loadTrailerConfigurations(id: number){ 
    
    if(id){
      
      this.loadingService.enableLoader();
      const stanchions$ = this.palmsTrailerConfigService.getStanchions(id);
      const brakes$ = this.palmsTrailerConfigService.getBrakes(id);
      const propulsions$ = this.palmsTrailerConfigService.getPropulsions(id);
      const drawbars$ = this.palmsTrailerConfigService.getDrawbars(id);
      const platforms$ = this.palmsTrailerConfigService.getPlatforms(id);
      const oilPumps$ = this.palmsTrailerConfigService.getOilPumps(id);
      const oilTanks$ = this.palmsTrailerConfigService.getOilTanks(id);
      const bolsterLock$ = this.palmsTrailerConfigService.getBolsterLock(id);
      const bbox$ = this.palmsTrailerConfigService.getBBox(id);
      const woodSorter$ = this.palmsTrailerConfigService.getWoodSorter(id);
      const handBrake$ = this.palmsTrailerConfigService.getHandBrake(id);
      const chainsawHolder$ = this.palmsTrailerConfigService.getChainsawHolder(id);
      const underrunProtection$ = this.palmsTrailerConfigService.getUnderrunProtection(id);
      const supportLegs$ = this.palmsTrailerConfigService.getSupportLegs(id);
      const lights$ = this.palmsTrailerConfigService.getLights(id);
      const tyres$ = this.palmsTrailerConfigService.getTyres(id);
      
      const request = forkJoin([stanchions$, brakes$, propulsions$, drawbars$, platforms$, oilPumps$, oilTanks$, bolsterLock$, bbox$, woodSorter$, handBrake$, chainsawHolder$, underrunProtection$, supportLegs$, lights$, tyres$]);
     
      request.subscribe(([stanchions, brakes, propulsions, drawbars, platforms, oilPumps, oilTanks, bolsterLock, bbox, woodSorter, handBrake, chainsawHolder, underrunProtection, supportLegs, lights, tyres]) => {
        if (stanchions.length > 0){
          
          this.stanchions = stanchions;
          this.palmsService._trailerPrice.set(stanchions[0].price)
          this.originalStanchion = stanchions[0];
          this.originalStanchionPrice = stanchions[0].price;
        }
        
        if (brakes.length > 0){
          this.brakes = brakes;
        }
        
        if (propulsions.length > 0){
          this.propulsions = propulsions;
        }
        
        if (drawbars.length > 0){
          this.drawbars = drawbars;
        }
  
        if (platforms.length > 0){
          this.platforms = platforms;
        }    
  
        if (oilPumps.length > 0){
          this.oilPumps = oilPumps;
        }    
  
        if (oilTanks.length > 0){
          this.oilTanks = oilTanks;
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
        }
  
        if (lights.length > 0){
          this.lights = lights;
        }
  
        if (tyres.length > 0){
          this.tyres = tyres;
        }
        
        this.trailerSelected = true;
        this.initializeFormGroup();
    } 
    
    ).add(() => {
      this.loadingService.disableLoader();
      this.palmsService._trailerSelected.next(true);
    })};
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

  onChainsawHolderChange(event: CheckboxChangeEvent) {
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

  selectCrane(crane: PalmsCraneOverview){
    console.log('select crane runs');
    
    this.palmsService._selectedCrane.next(crane);
  }

  delete() {
    console.log('delete in palms trailer');
    
    this.trailerSelected = false;
    this.trailerFormGroup.reset();
    this.originalStanchion = undefined;
    this.originalStanchionPrice = 0;
    this.originalBrake = undefined;
    this.originalBrakePrice = 0;
    this.originalPropulsion = undefined;
    this.originalPropulsionPrice = 0;
    this.originalDrawbar = undefined;
    this.originalDrawbarPrice = 0;
    this.originalPlatform = undefined;
    this.originalPlatformPrice = 0;
    this.originalOilPump = undefined;
    this.originalOilPumpPrice
    this.originalOilTank = undefined; 
    this.originalOilTankPrice
    this.originalBolsterLock = undefined; 
    this.originalBolsterLockPrice = 0;
    this.originalBbox = undefined; 
    this.originalBboxPrice = 0;
    this.originalWoodSorter = undefined;
    this.originalWoodSorterPrice = 0;
    this.originalHandBrake = undefined;  
    this.originalHandBrakePrice = 0;
    this.originalChainsawHolder = undefined; 
    this.originalChainsawHolderPrice = 0;
    this.originalUnderrunProtection = undefined;
    this.originalUnderrunProtectionPrice = 0;
    this.originalSupportLeg = undefined;
    this.originalSupportLegPrice = 0;
    this.originalLight = undefined;
    this.originalLightPrice = 0;
    this.originalTyre = undefined; 
    this.originalTyrePrice = 0;
    
    this.woodSorterChecked = false;
    this.woodSorterNumberSelected = false;
    this.woodSorterArrayElements = [];
    this.initialWoodSorterNumber = 0;
    this.previousWoodSorterNumber = 0;
  }
}