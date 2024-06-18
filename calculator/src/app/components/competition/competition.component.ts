import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { LoadingService } from '../../services/loading.service';
import { DocumentService } from '../../services/document.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-competition',
    standalone: true,
    templateUrl: './competition.component.html',
    providers: [MessageService],
    styleUrl: './competition.component.css',
    imports: [NavigationComponent, FooterComponent, CommonModule, FileUploadModule, ToastModule, ButtonModule]
})
export class CompetitionComponent {
    constructor(private readonly loadingService: LoadingService,
        private readonly documentService: DocumentService,
        private readonly messageService: MessageService,
    ) {
        
    }
    acceptedFiles: string = ".doc, .docx,";
    file: File | undefined;
    fileName : string | undefined;
    fileAdded = false;

    download(){
        const link = document.createElement('a');
        link.href = '../../../assets/ÁTK Pályázati kérdések.docx';  // Path to the file in assets
        link.download = 'ÁTK Pályázati kérdések.docx';  // Name for the downloaded file
        document.body.appendChild(link);  // Append link to the body
        link.click();  // Simulate a click
        document.body.removeChild(link);  // Remove link from the body
    }

    onSubmit(){
        if(this.file){
            this.loadingService.enableLoader();
            this.documentService.sendDocument(this.file)
                .subscribe(() => {
                    this.messageService.add({ key: 'file', severity: 'success', summary: 'Siker!', detail: 'Sikeres e-mail küldés!' });
                })
                .add(() => this.loadingService.disableLoader());
        }
    }

    onBasicUploadAuto(event: any) {
        this.file = event.files[0];
        this.fileName = event.files[0].name;
    
        
        if(this.file) {
            this.fileAdded = true;
            this.messageService.add({ key: 'file', severity: 'success', summary: 'Siker!', detail: 'Sikeres dokumentum feltöltés!' });
        }
    }
}
