import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MenuItem } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Checkbox, CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { AccordionModule } from 'primeng/accordion';
import { Listbox, ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';
import { Crane } from '../../../models/crane';
import { ConfigItem } from '../../../models/config-item';
import { CalculatorService } from '../../../services/calculator.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cranes',
  standalone: true,
  imports: [DividerModule, ListboxModule, AccordionModule, FieldsetModule, CardModule, ButtonModule, SelectButtonModule, FormsModule, CarouselModule, DropdownModule, ReactiveFormsModule, CurrencyPipe, CheckboxModule],
  templateUrl: './cranes.component.html',
  styleUrl: './cranes.component.css'
})
export class CranesComponent implements OnInit{
  cranes: Crane[] = [];
  items: MenuItem[] = [];
  controlBlocks: any[] = [];
  rotators: any[] = [];
  rotatorBrakes: any[] = [];
  responsiveOptions: any[] = [];
  vehicleTypes: any[] = [];
  configItemsArray: ConfigItem[] = [];

  selectedControlBlock = '';
  selectedRotator = '';
  selectedRotatorBrake = '';
  originalControlBlockPrice = 0;
  originalRotatorPrice = 0;
  originalRotatorBrakePrice = 0;
  equipmentSelected = false;

  @ViewChild('oilCoolerCheckBox') oilCoolerCheckBox!: Checkbox;
  @ViewChild('backrestCheckBox') backrestCheckBox!: Checkbox;
  @ViewChild('ledCheckBox') ledCheckBox!: Checkbox;
  @ViewChild('workingHoursCheckBox') workingHoursCheckBox!: Checkbox;

  @ViewChild('controlBlockListBox') controlBlockListBox!: Listbox;
  @ViewChild('rotatorListBox') rotatorListBox!: Listbox;
  @ViewChild('rotatorBrakeListBox') rotatorBrakeListBox!: Listbox;

  @ViewChild('configElement') configElement!: ElementRef;
  @ViewChild('addElement') addElement!: ElementRef;

  configItems: { [key: string]: ConfigItem } = {};
  originalPrices: { [key: string]: number } = {};
  originalEvent : DropdownChangeEvent | undefined;  

  constructor(
    readonly calculatorService : CalculatorService,
    private el: ElementRef, 
    private renderer: Renderer2,
    private router: Router
    ){}
  
  ngOnInit(): void {
    this.configItemsArray = Object.values(this.configItems);
    this.setCranes();
    this.setResponsiveOptions();
    this.setControlBlocks();
    this.setRotators();
    this.setRotatorBrakes();
    this.setConfigItems();
    this.setVehicleTypes();
  }

  navigateToMachine(machineId: string) {
    this.router.navigate(['/krpan', machineId]);
  }

  delete() {
    this.calculatorService._price.next(0);
    this.configItemsArray = [];

    this.resetOriginalPrices();
    this.resetCheckboxValues(this.oilCoolerCheckBox, this.backrestCheckBox, this.ledCheckBox, this.workingHoursCheckBox);
    this.resetListboxValues(this.controlBlockListBox, this.rotatorListBox, this.rotatorBrakeListBox);
    
    setTimeout(() => {
      this.addElement.nativeElement.scrollIntoView({ behavior: "smooth"});
    }, 100);
  }

  handleControlBlockChange(event: DropdownChangeEvent) {
    const previousValue = this.originalControlBlockPrice;
    this.originalControlBlockPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalControlBlockPrice;
  
    const current = this.calculatorService._price.value;
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + nextValue;
      this.calculatorService._price.next(newPrice);
    }
  }

  handleRotatorChange(event: DropdownChangeEvent) {
    const previousValue = this.originalRotatorPrice;
    this.originalRotatorPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalRotatorPrice;
  
    const current = this.calculatorService._price.value;
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + nextValue;
      this.calculatorService._price.next(newPrice);
    }
  }

  handleRotatorBrakeChange(event: DropdownChangeEvent) {
    const previousValue = this.originalRotatorBrakePrice;
    this.originalRotatorBrakePrice = event.value ? event.value.price : 0;
    const nextValue = this.originalRotatorBrakePrice;
  
    const current = this.calculatorService._price.value;
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + nextValue;
      this.calculatorService._price.next(newPrice);
    }
  }

  formatPrice(price: number | null): string {
    if (price !== null && price !== undefined) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
    } else {
      return 'N/A';
    }
  }

  addToCalculator(crane: Crane){
    this.delete();
    this.calculatorService._price.next(crane.price);
    this.equipmentSelected = true;

    setTimeout(() => {
      this.configElement.nativeElement.scrollIntoView({ behavior: "smooth"});
    }, 100);
    
  }

  handleChange(name: string, price: number, event: CheckboxChangeEvent) {
    if (event.checked.length > 0) {
      this.addToPrice(price);
      this.addToConfigItemsArray(name, price);

    } else {
      this.removeFromPrice(price);
      this.removeFromConfigItemsArray(name);
    }
  }

  private addToPrice(number: number) {
    const current = this.calculatorService._price.value;
    const newPrice = current + number;
    this.calculatorService._price.next(newPrice);
  }

  private removeFromPrice(number: number) {
    const current = this.calculatorService._price.value;
    const newPrice = current - number;
    this.calculatorService._price.next(newPrice);
  }

  private addToConfigItemsArray(name: string, number: number) {
    const newItem: ConfigItem = {
      name: name,
      price: number,
      added: true
    };
    this.configItemsArray.push(newItem);
  }

  private removeFromConfigItemsArray(name: string) {
    const index = this.configItemsArray.findIndex((item) => item.name === name);
    if (index !== -1) {
      this.configItemsArray.splice(index, 1);
    }
  }

  private resetOriginalPrices() {
    this.originalControlBlockPrice = 0;
    this.originalRotatorPrice = 0;
    this.originalRotatorBrakePrice = 0;
  }

  private resetCheckboxValues(...checkboxes: Checkbox[]) {
    checkboxes.forEach((checkbox) => {
      if (checkbox) {
        checkbox.writeValue(false);
      }
    });
  }

  private resetListboxValues(...listboxes: Listbox[]) {
    listboxes.forEach((listbox) => {
      if (listbox) {
        listbox.writeValue(null);
      }
    });
  }

  private setCranes(){
    this.cranes = [
      {
        id: '1',
        name: 'KRPAN GD 6,6 K',
        reachMax: '6,6',
        reachWithGrabOpen: '7,2',
        liftingTorqueNet: '40',
        liftingCapacity: '1020',
        weight: '900',
        price: 17955,
        imgUrl: '../../../assets/daru1.png'
      },
      {
        id: '2',
        name: 'KRPAN GD 7,6 K',
        reachMax: '7,6',
        reachWithGrabOpen: '8,2',
        liftingTorqueNet: '39',
        liftingCapacity: '1020',
        weight: '930',
        price: 19575,
        imgUrl: '../../../assets/daru2.png'
      }
    ]
  }

  private setConfigItems(){
    this.configItems = {
      'háttámla': {
        name: 'Háttámla',
        price: 165,
        added: false
      },
      'olajhűtő': {
        name: 'Olajhűtő',
        price: 710,
        added: false
      },
      'hidraulikusVezérlés': {
        name: 'HidraulikusVezérlés',
        price: 0,
        added: false
      },
      'elektronikusVezérlés': {
        name: 'ElektronikusVezérlés',
        price: 2165,
        added: false
      },
      'ledMunkalámpák': {
        name: 'LED Munkalámpák',
        price: 325,
        added: false
      },
      'munkaÓraSzámláló': {
        name: 'Munkaóra számláló',
        price: 260,
        added: false
      },
    }
  }

  private setVehicleTypes(){
    this.vehicleTypes = [
      { name: 'Daruk', value: 1 },
      { name: 'Pótkocsik', value: 2 },
      { name: 'Közelítő pótkocsik', value: 3 }
    ];
}

  private setControlBlocks(){
      this.controlBlocks = [
        { name: 'hidraulikus vezérlés (0 €)', price: 0 },
        { name: 'elektronikus vezérlés (2165 €)', price: 2165 }
    ];
  }

  private setRotators(){
    this.rotators = [
      { name: 'GR120 kanál + 30 kN-os rotátor + közbetét (0 €)', price: 0 },
      { name: 'GR130 kanál + 45 kN-os rotátor + közbetét (460 €)', price: 460 }
  ];

    
  }
  private setRotatorBrakes(){
      this.rotatorBrakes = [
        { name: 'Rotátorfék nélkül (0 €)', price: 0 },
        { name: 'Rotátor fék - szimpla (265 €)', price: 265 },
        { name: 'Rotátor fék - dupla (370 €)', price: 370 }
      ];
  }

  private setResponsiveOptions(){
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '1220px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '1100px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
}
