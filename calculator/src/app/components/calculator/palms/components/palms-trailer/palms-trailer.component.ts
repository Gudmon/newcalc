import { Component, OnInit, ViewChild } from '@angular/core';
import { PalmsService } from '../../services/palms.service';
import { ActivatedRoute } from '@angular/router';
import { PalmsTrailer } from '../../models/palms-trailer';
import { NavigationComponent } from "../../../../navigation/navigation.component";
import { FooterComponent } from "../../../../footer/footer.component";
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ListboxChangeEvent, ListboxModule } from 'primeng/listbox';
import { ImageModule } from 'primeng/image';
import { ConfigurationItem } from '../../../../../models/configuration-item';
import { PalmsTrailerConfigService } from '../../services/palms-trailer-config.service';
import { FormatPricePipe } from "../../../../pipes/format-price.pipe";
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

@Component({
    selector: 'app-palms-trailer',
    standalone: true,
    providers: [PalmsService],
    templateUrl: './palms-trailer.component.html',
    styleUrl: './palms-trailer.component.css',
    imports: [NavigationComponent, FooterComponent, DividerModule, GalleriaModule, FormsModule, ReactiveFormsModule, ButtonModule, ImageModule, ListboxModule, FormatPricePipe, BrakesDialogComponent, DrawbarDialogComponent, PlatormDialogComponent, OilPumpDialogComponent, OilTankDialogComponent, CheckboxModule, OilTankCoolerDialogComponent, BolsterLockDialogComponent, BboxDialogComponent]
})
export class PalmsTrailerComponent implements OnInit{
  displayBasic: boolean = false;
  images: any[] | undefined = []
  responsiveOptions: any[] = []

  trailer!: PalmsTrailer
  private id = this.activatedRoute.snapshot.paramMap.get('id')!;
  equipmentSelected: boolean = false;

  @ViewChild('oilTankCoolerCheckBox') oilTankCoolerCheckBox!: Checkbox;

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
  originalHandBrake: ConfigurationItem | undefined = undefined;
  originalChainsawHolder: ConfigurationItem | undefined = undefined;
  originalUnderrunProtection: ConfigurationItem | undefined = undefined;

  formGroup: FormGroup = new FormGroup({
    selectedStanchion: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedBrake: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedPropulsion: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedDrawbar: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedPlatform: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedOilPump: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedOilTank: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedOilTankCooler: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedBolsterLock: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedBbox: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedWoodSorter: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedHandBrake: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedChainsawHolder: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedUnderrunProtection: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
  });

  private initializeFormGroup(): void {
    
    this.formGroup = this.fb.group({
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
      selectedHandbrake: null,
      selectedChainsawHolder: null,
      selectedUnderrunProtection: null
    });
  }   

  constructor(
    readonly palmsService: PalmsService,
    private palmsTrailerConfigService: PalmsTrailerConfigService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,) {}

  ngOnInit(): void {
    this.palmsService.getTrailer(this.id).pipe().subscribe((response) => {
      this.trailer = response as PalmsTrailer; 
      this.setResponsiveOptions();
      this.setImages();
    })  
  }


  getCranes(){
    const craneNames = this.trailer.crane.map((crane) => crane.name);
    return craneNames;
  }

  loadTrailerConfigurations(){  
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
    
    const request = forkJoin([stanchions$, brakes$, propulsions$, drawbars$, platforms$, oilPumps$, oilTanks$, bolsterLock$, bbox$, woodSorter$, handBrake$, chainsawHolder$, underrunProtection$]);

    request.subscribe(([stanchions, brakes, propulsions, drawbars, platforms, oilPumps, oilTanks, bolsterLock, bbox, woodSorter, handBrake, chainsawHolder, underrunProtection]) => {
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
      
      this.initializeFormGroup();
      this.equipmentSelected = true;
  });
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
          this.showWoodSorterDialog = show;
          break;
        case 'underrunProtection':
          this.showWoodSorterDialog = show;
          break;     
        default:
          break;
      }
  }

  delete() {
    console.log(this.formGroup.value);
    this.equipmentSelected = false;
    
    this.palmsService._trailerPrice.set(0);
    this.formGroup.reset();
    this.originalStanchion = undefined;
    this.originalBrake = undefined;
    this.originalPropulsion = undefined;
    this.originalDrawbar = undefined;
    this.originalPlatform = undefined;
    this.originalOilPump = undefined;
    this.originalOilTank = undefined; 
    this.originalBolsterLock = undefined; 
    this.originalBbox = undefined; 
    this.originalHandBrake = undefined;  
    this.originalChainsawHolder = undefined; 
    this.originalUnderrunProtection = undefined; 
  }

  private setImages(){
    if(this.trailer){
      this.images = [
        {
          itemImageSrc: `../../../../../../assets/${this.trailer.name}-2.svg`,
          thumbnailImageSrc:  `../../../../../../assets/${this.trailer.name}-2.svg`,
          alt: 'Description for Image 1',
          title: 'Title 1'
        },
        {
          itemImageSrc: `../../../../../../assets/${this.trailer.name}-3.jpg`,
          thumbnailImageSrc:  `../../../../../../assets/${this.trailer.name}-3.jpg`,
          alt: 'Description for Image 1',
          title: 'Title 1'
        },
      ]
    }
  }

  private setResponsiveOptions(){
    this.responsiveOptions = [
      {
          breakpoint: '1500px',
          numVisible: 5
      },
      {
          breakpoint: '1024px',
          numVisible: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
    ];
  }
}
