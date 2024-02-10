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

@Component({
    selector: 'app-palms-trailer',
    standalone: true,
    providers: [PalmsService],
    templateUrl: './palms-trailer.component.html',
    styleUrl: './palms-trailer.component.css',
    imports: [NavigationComponent, FooterComponent, DividerModule, GalleriaModule, FormsModule, ReactiveFormsModule, ButtonModule, ImageModule, ListboxModule, FormatPricePipe]
})
export class PalmsTrailerComponent implements OnInit{
  displayBasic: boolean = false;
  images: any[] | undefined = []
  responsiveOptions: any[] = []

  trailer!: PalmsTrailer
  private id = this.activatedRoute.snapshot.paramMap.get('id')!;
  equipmentSelected: boolean = false;

  stanchions: ConfigurationItem[] = [];

  selectedConfigurationItems: ConfigurationItem[] = [];

  originalStanchionPrice = 0;
  originalBrakePrice = 0;

  originalStanchion: ConfigurationItem | undefined = undefined;
  originalBrake: ConfigurationItem | undefined = undefined;

  formGroup: FormGroup = new FormGroup({
    selectedStanchion: new FormControl<ConfigurationItem>({name: '', code: '', price: 0, namePrice: ''}),
  });

  private initializeFormGroup(): void {
    this.formGroup = this.fb.group({
      selectedStanchion: [this.stanchions[0]]

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
    this.equipmentSelected = true;
    this.loadStanchions();
    
  }

  handleStanchionChange(event: ListboxChangeEvent) {
    const previousValue = this.palmsService._trailerPrice;
    this.originalStanchionPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalStanchionPrice;
    const current = this.palmsService._trailerPrice();
  
    if (previousValue() !== nextValue) {
      const newPrice = current - previousValue() + Number(nextValue);
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


  private loadStanchions(){
    this.palmsTrailerConfigService.getStanchions(this.id).subscribe((stanchions) => {
      this.stanchions = stanchions as ConfigurationItem[];
      this.initializeFormGroup();
      this.palmsService._trailerPrice.set(stanchions[0].price)
      this.originalStanchion = stanchions[0];
      console.log(this.formGroup.value) 
      
    })
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
