import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MenuItem } from 'primeng/api';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup } from '@angular/forms';
import { Checkbox, CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { AccordionModule } from 'primeng/accordion';
import { Listbox, ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';
import { Crane } from '../../../models/crane';
import { ConfigItem } from '../../../models/config-item';
import { CalculatorService } from '../../../services/calculator.service';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { RemovePricePipe } from '../../pipes/remove-price.pipe';
import { FormatPricePipe } from '../../pipes/format-price.pipe';
import { EmailService } from '../../../services/email.service';
import { Subscription } from 'rxjs';
import { jsPDF } from 'jspdf';

@Component({
    selector: 'app-cranes',
    standalone: true,
    templateUrl: './cranes.component.html',
    styleUrl: './cranes.component.css',
    providers: [EmailService],
    imports: [DividerModule, ListboxModule, DialogModule, AccordionModule, FieldsetModule, CardModule, ButtonModule, SelectButtonModule, FormsModule, CarouselModule, DropdownModule, ReactiveFormsModule, CurrencyPipe, CheckboxModule, RemovePricePipe, FormatPricePipe]
})
export class CranesComponent implements OnInit, OnDestroy{
  cranes: Crane[] = [];
  items: MenuItem[] = [];
  controlBlocks: any[] = [];
  rotators: any[] = [];
  rotatorBrakes: any[] = [];
  responsiveOptions: any[] = [];
  vehicleTypes: any[] = [];

  configItemsArray: ConfigItem[] = [];
  originalControlBlockItemsArray: ConfigItem[] = [];
  originalRotatorItemsArray: ConfigItem[] = [];
  originalRotatorBrakesItemsArray: ConfigItem[] = [];

  originalControlBlockPrice = 0;
  originalRotatorPrice = 0;
  originalRotatorBrakePrice = 0;

  equipmentSelected: boolean = false;
  submitted: boolean = false;
  blurred: boolean = false;
  controlBlocksDialogvisible: boolean = false;
  rotatorsDialogvisible: boolean = false;
  rotatorBrakesDialogvisible: boolean = false;

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
  attachCalculationSubscription!: Subscription;

  formGroup: FormGroup = new FormGroup({
    selectedVehicle: new FormControl<ConfigItem>({name: '', price: 0}),
    selectedControlBlock: new FormControl<string>(''),
    selectedRotator: new FormControl<string>(''),
    selectedRotatorBrake: new FormControl<string>(''),
    backRestSelected: new FormControl<ConfigItem>({name: '', price: 0}),
    oilCoolerSelected: new FormControl<ConfigItem>({name: '', price: 0}),
    ledSelected: new FormControl<ConfigItem>({name: '', price: 0}),
    workingHoursSelected: new FormControl<ConfigItem>({name: '', price: 0}),
    attachCalculation: new FormControl<boolean>(false),
    name: new FormControl<string>(''),
    email: new FormControl<string>(''),
    message: new FormControl<string>(''),
  });
  
  constructor(
    readonly calculatorService : CalculatorService,
    private fb: FormBuilder,
    private router: Router,
    readonly emailService: EmailService
    ){}

  private initializeFormGroup(): void {
    this.formGroup = this.fb.group({
      selectedVehicle: ['', Validators.required],
      selectedControlBlock: ['',],
      selectedRotator: [''],
      selectedRotatorBrake: [''],
      backRestSelected: [''],
      oilCoolerSelected: [''],
      ledSelected: [''],
      workingHoursSelected: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
      attachCalculation: ['']
    });
  }   

  ngOnDestroy(): void {
    if (this.attachCalculationSubscription) {
      this.attachCalculationSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.configItemsArray = Object.values(this.configItems);
    this.setCranes();
    this.setResponsiveOptions();
    this.setControlBlocks();
    this.setRotators();
    this.setRotatorBrakes();
    this.setConfigItems();
    this.setVehicleTypes();
    this.initializeFormGroup();
    this.setupValidators();
    this.subscribeToAttachCalculationChanges();
  }  
  downloadPDF(){
    const now = new Date().getTime();
    const report_generated_at = this.getFormattedDateAndTime(now);
    const randomId = Math.random().toString(36).substring(2, 10);
 
    // create a new pdf
    const doc = new jsPDF();

    // doc title
    doc.setFontSize(28)
    doc.text(`${randomId}`, 20, 25);

    // sub title (Room Name)
    doc.setFontSize(14);

    // meta data (checkin ID / start / end)
    doc.setTextColor(150);
    doc.setFontSize(10);

    doc.text('Dátum:', 140, 28, );
    doc.text(`${report_generated_at}`, 155, 28);

    doc.line(10, 45, 200, 45) // horizontal line

    // checkin data
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);

    // list names
    doc.setFontSize(12);
    doc.setTextColor(150);
    doc.text('Name', 20, 80);
    doc.text('Attached', 90, 80);
    doc.text('Checkin time', 150, 80);

    doc.setDrawColor(128, 128, 128) // draw red lines
    doc.line(10, 85, 200, 85) // horizontal line

    
    

    doc.save(`clear-globe/${randomId}/${now}.pdf`);
  }
  generateRandomId() {
    // Generate a random ID (you can use your own logic here)
    return Math.random().toString(36).substring(2, 10);
  }
  getFormattedDateAndTime(timestamp: number) {
    return `${this.tsToDate(timestamp)} ${this.tsToHHMM(timestamp)}`;
  }

  tsToDate(timestamp: number) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(timestamp).toLocaleDateString('hu-HU', options);
}

tsToHHMM(timestamp: number) {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    return date.toLocaleTimeString('hu-HU', options);
}
  hasError(controlName: string, errorName: string): boolean {
    return this.formGroup.get(controlName)?.hasError(errorName) || false;
  }

  attachChange(event: CheckboxChangeEvent){
    if (event.checked.length > 0){
      this.calculatorService._attachCalculation.next(true);
    } else {
      this.calculatorService._attachCalculation.next(false);
    }
  }

  showControlBlocksDialog() {
    this.controlBlocksDialogvisible = true;
  }

  showRotatorsDialog() {
    this.rotatorsDialogvisible = true;
  }

  showRotatorBrakesDialog() {
    this.rotatorBrakesDialogvisible = true;
  }

  onEmailBlur() {
    this.blurred = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.formGroup.valid);
    if (this.formGroup.invalid) {
      return;
    }
  
    this.sendEmail();
  }

  sendEmail() {
    let formDataToSend: {
      [key: string]: any;     
    };

    formDataToSend = {
      name: this.formGroup.controls['name'].value,
      email: this.formGroup.controls['email'].value,
      message: this.formGroup.controls['message'].value
    };
  
    if (this.formGroup.valid) {
      if (this.formGroup.controls['attachCalculation'].value && this.formGroup.controls['attachCalculation'].value.includes('selected')) {
        formDataToSend = {
          ...formDataToSend,
          selectedVehicle: this.formGroup.controls['selectedVehicle'].value,
          selectedControlBlock: this.formGroup.controls['selectedControlBlock'].value,
          selectedRotator: this.formGroup.controls['selectedRotator'].value,
          selectedRotatorBrake: this.formGroup.controls['selectedRotatorBrake'].value,
          finalPrice: this.calculatorService._price.value
        };
  
        const checkboxKeys = ['backRestSelected', 'oilCoolerSelected', 'ledSelected', 'workingHoursSelected'];
        checkboxKeys.forEach(key => {
          if (this.formGroup.controls[key].value && this.formGroup.controls[key].value.includes('selected')) {
            formDataToSend[key] = { name: this.configItems[key].name, price: this.configItems[key].price };
          }
        });
  
      } 
  
      console.log(JSON.stringify(formDataToSend, null, 2));
      // this.emailService.sendEmail(formDataToSend);
      this.submitted = false;
    }
  }
  

  navigateToMachine(machineId: string) {
    this.router.navigate(['/krpan', machineId]);
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

    if (event.value){
      const newItem: ConfigItem = {
        name: event.value.name,
        price: event.value.price
      }
      this.originalControlBlockItemsArray = [];
      this.originalControlBlockItemsArray.push(newItem);
    } else {
      this.originalControlBlockItemsArray = [];
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

    if (event.value){
      const newItem: ConfigItem = {
        name: event.value.name,
        price: event.value.price
      }
      this.originalRotatorItemsArray = [];
      this.originalRotatorItemsArray.push(newItem);
    } else {
      this.originalRotatorItemsArray = [];
    }
  }

  handleRotatorBrakeChange(event: DropdownChangeEvent) {
    const previousValue = this.originalRotatorPrice;
    this.originalRotatorPrice = event.value ? event.value.price : 0;
    const nextValue = this.originalRotatorPrice;
  
    const current = this.calculatorService._price.value;
  
    if (previousValue !== nextValue) {
      const newPrice = current - previousValue + nextValue;
      this.calculatorService._price.next(newPrice);
    }

    if (event.value){
      const newItem: ConfigItem = {
        name: event.value.name,
        price: event.value.price
      }
      this.originalRotatorBrakesItemsArray = [];
      this.originalRotatorBrakesItemsArray.push(newItem);
    } else {
      this.originalRotatorBrakesItemsArray = [];
    }
  }

  addToCalculator(crane: Crane){
    this.equipmentSelected = true;
    this.resetConfigArrays();
    this.formGroup.reset();
    this.formGroup.patchValue({
      selectedVehicle: { name: crane.name, price: crane.price }
    });
    this.calculatorService._price.next(crane.price);
    
    setTimeout(() => {
      this.configElement.nativeElement.scrollIntoView({ behavior: "smooth"});
    }, 100);
  }

  delete() {
    this.calculatorService._price.next(0);
    this.resetConfigArrays();
    this.formGroup.reset();
    
    setTimeout(() => {
      this.addElement.nativeElement.scrollIntoView({ behavior: "smooth"});
    }, 100);

    setTimeout(() => {
      this.equipmentSelected = false;
    }, 700);
  }

  handleChange(name: string, price: number, event: CheckboxChangeEvent) {
    console.log(event);
    if (event.checked.length > 0) {
      this.addToPrice(price);
      this.addToConfigItemsArray(name, price);

    } else {
      this.removeFromPrice(price);
      this.removeFromConfigItemsArray(name);
    }
  }

  private setupValidators(): void {
    const requiredFields = ['selectedControlBlock', 'selectedRotator', 'selectedRotatorBrake'];

    for (const field of requiredFields) {
      const control = this.formGroup.get(field);
      control?.setValidators([Validators.required]);
      control?.updateValueAndValidity();
    }
  }

  private subscribeToAttachCalculationChanges(): void {
    this.attachCalculationSubscription = this.calculatorService.attachCalculation$.subscribe((value) => {

      const requiredFields = ['selectedControlBlock', 'selectedRotator', 'selectedRotatorBrake'];

      for (const field of requiredFields) {
        const control = this.formGroup.get(field);

        if (value) {
          control?.setValidators([Validators.required]);
        } else {
          control?.clearValidators();
        }

        control?.updateValueAndValidity();
      }
    });
  }
  
  private addToConfigItemsArray(name: string, number: number) {
    const newItem: ConfigItem = {
      name: name,
      price: number
    };
    this.configItemsArray.push(newItem);
  }

  private removeFromConfigItemsArray(name: string) {
    const index = this.configItemsArray.findIndex((item) => item.name === name);
    if (index !== -1) {
      this.configItemsArray.splice(index, 1);
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

  private resetConfigArrays(){
    this.configItemsArray = [];
    this.originalControlBlockItemsArray = [];
    this.originalRotatorBrakesItemsArray = [];
    this.originalRotatorItemsArray = [];
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
      'backRestSelected': {
        name: 'Háttámla',
        price: 165
      },
      'oilCoolerSelected': {
        name: 'Olajhűtő',
        price: 710
      },
      'ledSelected': {
        name: 'LED Munkalámpák',
        price: 325,
      },
      'workingHoursSelected': {
        name: 'Munkaóra számláló',
        price: 260,
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
