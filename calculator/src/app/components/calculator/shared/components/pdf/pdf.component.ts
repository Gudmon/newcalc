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
    const object: PdfModel = {
      Stanchion: this.palmsService.selectedStanchion(),
    };
    this.loadingService.enableLoader();
    this.pdfService
      .sendPdf(object)
      .pipe(
        concatMap((resp) => {
          this.pdfService.pdfId.set(resp.id);
          return this.pdfService.getPdf(resp.id)
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
      Stanchion: this.palmsService.selectedStanchion()
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
    this.pdfService.getPdf(this.pdfService.pdfId()).subscribe(
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



interface PdfModel {
  Stanchion: ConfigurationItem | undefined
}
