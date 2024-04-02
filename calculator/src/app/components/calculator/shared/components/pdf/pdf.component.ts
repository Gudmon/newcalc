import { FrameType } from './../../../palms/cranes/models/frame-type';
import { Component, OnInit } from '@angular/core';
import { PalmsService } from '../../../palms/shared/services/palms.service';
import { PdfService } from '../../../../../services/pdf.service';
import { ConfigurationItem } from '../../../../../models/configuration-item';
import { concatMap, switchMap } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../../../services/email.service';
import { LoadingService } from '../../../../../services/loading.service';
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-pdf',
  standalone: true,
  providers: [MessageService],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.css'
})
export class PdfComponent implements OnInit{
  submitted: boolean = false;
  blurred: boolean = false;

  constructor(private readonly palmsService: PalmsService,
    private readonly pdfService: PdfService,
    private readonly emailService: EmailService,
    private readonly loadingService: LoadingService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,) {
    
  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  formGroup: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string>(''),
    message: new FormControl<string>('')
  });

  private initializeFormGroup(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
  }   

  onEmailBlur() {
    this.blurred = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  onSubmit(): void {
    console.log(this.formGroup.valid);
    console.log(this.pdfService.pdfId());
    this.submitted = true;

    if(this.formGroup.valid){
      this.sendEmail();
    }
    
  }

  sendPdfAndDownload() {
    const object: PdfModel = {};
    console.log(this.palmsService._trailerSelected.value);
    if (this.palmsService._trailerSelected.value === true) {
      const woodSorter = this.palmsService.selectedWoodSorter();
      const newWoodSorter: ConfigurationItem | undefined = woodSorter
        ? {
            ...woodSorter,
            price: woodSorter.price.toString(),
          }
        : undefined;

      const bunkAdapter = this.palmsService.selectedBunkAdapter();
      const newBunkAdapter: ConfigurationItem | undefined = bunkAdapter
        ? {
            ...bunkAdapter,
            price: bunkAdapter.price.toString(),
          }
        : undefined;  
      object.TrailerName = this.palmsService._selectedTrailer.value?.name;
      object.Stanchion = this.palmsService.selectedStanchion();
      object.Brake = this.palmsService.selectedBrake();
      object.Propulsion = this.palmsService.selectedPropulsion();
      object.Drawbar = this.palmsService.selectedDrawbar();
      object.Platform = this.palmsService.selectedPlatform();
      object.OilPump = this.palmsService.selectedOilPump();
      object.OilTank = this.palmsService.selectedOilTank();
      object.TrailerOilCooler = this.palmsService.selectedTrailerOilCooler();
      object.BolsterLock = this.palmsService.selectedBolsterLock();
      object.BBox = this.palmsService.selectedBBox();
      object.WoodSorter = newWoodSorter;
      object.HandBrake = this.palmsService.selectedHandBrake();
      object.ChainsawHolder = this.palmsService.selectedChainsawHolder();
      object.UnderrunProtection = this.palmsService.selectedUnderrunProtection();
      object.BunkAdapter = newBunkAdapter;
      object.BunkExtension = this.palmsService.selectedBunkExtension();
      object.FrameExtension = this.palmsService.selectedFrameExtension();
      object.TrailerLight = this.palmsService.selectedTrailerLight();
      object.Tyre = this.palmsService.selectedTyre();
    }else {
      object.Grapples = [];
    }
    console.log(this.palmsService._craneSelected.value);

    if (this.palmsService._craneSelected.value === true) {
      object.CraneName = this.palmsService._selectedCrane.value?.name
      object.ControlBlock = this.palmsService.selectedControlBlock();
      object.FrameType = this.palmsService.selectedFrameType();
      object.Rotator = this.palmsService.selectedRotator();
      object.Grapple = this.palmsService.selectedGrapple();
      object.Grapples = this.palmsService.selectedGrapples;
      object.Winch = this.palmsService.selectedWinch();
      object.ProtectionSleeves = this.palmsService.selectedProtectionSleeves();
      object.ElectricalFloating = this.palmsService.selectedElectricalFloating();
      object.ValveBlock = this.palmsService.selectedValveBlock();
      object.Damping = this.palmsService.selectedDamping();
      object.CraneLight = this.palmsService.selectedCraneLight();
      object.OperatorSeat = this.palmsService.selectedOperatorSeat();
      object.CraneOilCooler = this.palmsService.selectedCraneOilCooler();
      object.RotatorBrake = this.palmsService.selectedRotatorBrake();
      object.JoystickHolder = this.palmsService.selectedJoystickHolder();
      object.HoseGuard = this.palmsService.selectedHoseGuard();
      object.TurningDeviceCounterPlate = this.palmsService.selectedTurningDeviceCounterPlate();
      object.SupportLegCounterPlate = this.palmsService.selectedSupportLegCounterPlate();
      object.BoomGuard = this.palmsService.selectedBoomGuard();
      object.Cover = this.palmsService.selectedCover();
      object.WoodControl = this.palmsService.selectedWoodControl();
      object.Linkage = this.palmsService.selectedLinkage();
    } else {
      object.Grapples = [];
    }

    this.loadingService.enableLoader();
    this.pdfService
      .sendPdf(object)
      .pipe(
        concatMap((resp) => {
          this.pdfService.pdfId.set(resp.id);
          return this.pdfService.getUserPdf(resp.id)
        })
      )
      .subscribe(
        (blob: Blob) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${this.pdfService.pdfId()}.pdf`;
          link.click();
        }
      ).add(() => this.loadingService.disableLoader());
  }

  sendPdf(){
    const object: PdfModel = {
      Stanchion: this.palmsService.selectedStanchion(),
      Brake: this.palmsService.selectedBrake()
    }
    this.pdfService.sendPdf(object).subscribe((resp) => {
      console.log('resp', resp);
      
      this.pdfService.pdfId.set(resp.id)

      console.log(this.pdfService.pdfId());
      
    });
    
  }

  sendEmail(){
    const subject = `Sikeres kalkuláció - ${this.pdfService.pdfId()}`;
    const body = "Sikeres kalkuláció";
    const blobName = this.pdfService.pdfId();
    this.loadingService.enableLoader();
    this.emailService.sendEmail(subject, body, blobName).subscribe((resp) => {
      console.log('resp', resp);
      this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'Sikeres e-mail küldés!' });
    }).add(() => {
      this.submitted = false;
      this.loadingService.disableLoader()
    });
    
  }

  getPdf(){
    console.log(this.pdfService.pdfId());
    this.loadingService.enableLoader();
    this.pdfService.getUserPdf(this.pdfService.pdfId()).subscribe(
      (resp) => {
        const blob = new Blob([resp], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'file.pdf';
        link.click();
      }
    ).add(() => this.loadingService.disableLoader());
  }
  
}



interface PdfTrailerModel {
  TrailerName?: string | undefined,
  Stanchion?: ConfigurationItem | undefined,
  Brake?: ConfigurationItem | undefined,
  Propulsion?: ConfigurationItem | undefined,
  Drawbar?: ConfigurationItem | undefined,
  Platform?: ConfigurationItem | undefined,
  OilPump?: ConfigurationItem | undefined,
  OilTank?: ConfigurationItem | undefined,
  TrailerOilCooler?: ConfigurationItem | undefined,
  BolsterLock?: ConfigurationItem | undefined,
  BBox?: ConfigurationItem | undefined,
  WoodSorter?: ConfigurationItem | undefined,
  HandBrake?: ConfigurationItem | undefined,
  ChainsawHolder?: ConfigurationItem | undefined,
  UnderrunProtection?: ConfigurationItem | undefined,
  BunkAdapter?: ConfigurationItem | undefined,
  BunkExtension?: ConfigurationItem | undefined,
  FrameExtension?: ConfigurationItem | undefined,
  TrailerLight?: ConfigurationItem | undefined,
  Tyre?: ConfigurationItem | undefined,
}

interface PdfCraneModel {
  CraneName?: string | undefined,
  ControlBlock?: ConfigurationItem | undefined,
  FrameType?: ConfigurationItem | undefined,
  Rotator?: ConfigurationItem | undefined,
  Grapple?: ConfigurationItem | undefined,
  Grapples?: (ConfigurationItem | undefined)[],
  Winch?: ConfigurationItem | undefined,
  ProtectionSleeves?: ConfigurationItem | undefined,
  ElectricalFloating?: ConfigurationItem | undefined,
  ValveBlock?: ConfigurationItem | undefined,
  Damping?: ConfigurationItem | undefined,
  CraneLight?: ConfigurationItem | undefined,
  OperatorSeat?: ConfigurationItem | undefined,
  CraneOilCooler?: ConfigurationItem | undefined,
  RotatorBrake?: ConfigurationItem | undefined,
  JoystickHolder?: ConfigurationItem | undefined,
  HoseGuard?: ConfigurationItem | undefined,
  TurningDeviceCounterPlate?: ConfigurationItem | undefined,
  SupportLegCounterPlate?: ConfigurationItem | undefined,
  BoomGuard?: ConfigurationItem | undefined,
  Cover?: ConfigurationItem | undefined,
  WoodControl?: ConfigurationItem | undefined,
  Linkage?: ConfigurationItem | undefined,
}

export interface PdfModel extends PdfTrailerModel, PdfCraneModel{

}