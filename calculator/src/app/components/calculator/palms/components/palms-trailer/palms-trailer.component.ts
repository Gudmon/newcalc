import { Component, OnInit } from '@angular/core';
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

@Component({
    selector: 'app-palms-trailer',
    standalone: true,
    providers: [PalmsService],
    templateUrl: './palms-trailer.component.html',
    styleUrl: './palms-trailer.component.css',
    imports: [NavigationComponent, FooterComponent, DividerModule, GalleriaModule, FormsModule, ReactiveFormsModule, ButtonModule, ImageModule, ListboxModule, FormatPricePipe, BrakesDialogComponent, DrawbarDialogComponent]
})
export class PalmsTrailerComponent implements OnInit{
  displayBasic: boolean = false;
  images: any[] | undefined = []
  responsiveOptions: any[] = []

  trailer!: PalmsTrailer
  private id = this.activatedRoute.snapshot.paramMap.get('id')!;
  equipmentSelected: boolean = false;

  showBrakesDialog: boolean = false;
  showDrawbarsDialog: boolean = false;
  showPlatformsDialog: boolean = false;
  showOilPumpsDialog: boolean = false;
  showOilTanksDialog: boolean = false;

  stanchions: ConfigurationItem[] = [];
  brakes: ConfigurationItem[] = [];
  propulsions: ConfigurationItem[] = [];
  drawbars: ConfigurationItem[] = [];
  platforms: ConfigurationItem[] = [];
  oilPumps: ConfigurationItem[] = [];
  oilTanks: ConfigurationItem[] = [];

  selectedConfigurationItems: ConfigurationItem[] = [];

  originalStanchionPrice = 0;
  originalBrakePrice = 0;
  originalPropulsionPrice = 0;
  originalDrawbarPrice = 0;
  originalPlatformPrice = 0;
  originalOilPumpPrice = 0;
  originalOilTankPrice = 0;

  originalStanchion: ConfigurationItem | undefined = undefined;
  originalBrake: ConfigurationItem | undefined = undefined;
  originalPropulsion: ConfigurationItem | undefined = undefined;
  originalDrawbar: ConfigurationItem | undefined = undefined;
  originalPlatform: ConfigurationItem | undefined = undefined;
  originalOilPump: ConfigurationItem | undefined = undefined;
  originalOilTank: ConfigurationItem | undefined = undefined;

  formGroup: FormGroup = new FormGroup({
    selectedStanchion: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedBrake: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedPropulsion: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedDrawbar: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedPlatform: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedOilPump: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
    selectedOilTank: new FormControl<ConfigurationItem>({id: '', name: '', code: '', price: 0, namePrice: ''}),
  });

  private initializeFormGroup(): void {
    
    this.formGroup = this.fb.group({
      selectedStanchion: [this.stanchions[0]],
      selectedBrake: [this.brakes[0]],
      selectedPropulsion: [this.propulsions[0]],
      selectedDrawbar: [this.drawbars[0]],
      selectedPlatform: [this.platforms[0]],
      selectedOilPump: [this.oilPumps[0]],
      selectedOilTank: [this.oilTanks[0]]

    });
    console.log(this.formGroup.value);
  }   

  constructor(
    readonly palmsService: PalmsService,
    private palmsTrailerConfigService: PalmsTrailerConfigService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,) {}

  ngOnInit(): void {
    this.palmsService.getTrailer(this.id).pipe().subscribe((response) => {

      this.trailer = response as PalmsTrailer;   
      console.log(this.trailer);
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
    
    const request = forkJoin([stanchions$, brakes$, propulsions$, drawbars$, platforms$, oilPumps$, oilTanks$]);

    request.subscribe(([stanchions, brakes, propulsions, drawbars, platforms, oilPumps, oilTanks]) => {
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
  }

  toggleDialog(dialogType: string, show: boolean) {
    switch (dialogType) {
        case 'brakes':
            this.showBrakesDialog = show;
            break;
        case 'drawbars':
            this.showDrawbarsDialog = show;
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
