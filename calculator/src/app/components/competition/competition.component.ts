import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { LoadingService } from '../../services/loading.service';
import { DocumentService } from '../../services/document.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FloatLabelModule } from "primeng/floatlabel"
import { RadioButtonModule } from 'primeng/radiobutton';
import { EmailService } from '../../services/email.service';

@Component({
    selector: 'app-competition',
    standalone: true,
    templateUrl: './competition.component.html',
    providers: [MessageService],
    styleUrl: './competition.component.css',
    imports: [FormsModule, ReactiveFormsModule, RadioButtonModule, NavigationComponent, FloatLabelModule, FooterComponent, CommonModule, FileUploadModule, ToastModule, ButtonModule, DropdownModule]
})
export class CompetitionComponent implements OnInit {
    constructor(private readonly loadingService: LoadingService,
        private readonly documentService: DocumentService,
        private readonly messageService: MessageService,
        private readonly emailService: EmailService,
        private readonly fb: FormBuilder) {}

    acceptedFiles: string = ".doc, .docx,";
    file: File | undefined;
    fileName : string | undefined;
    fileAdded = false;

    businessForms: Option[] = []
    categories: Option[] = [];
    katas: Option[] = [];
    businessYears: Option[] = [];
    manPowers: Option[] = [];

    countries!: Country[];
    selectedCountry!: Country;

    ngOnInit(): void {
        this.initializeBusinessForms();
        this.initializeCatgories();
        this.initializeKatas();
        this.initializeBusinessYears();
        this.initializeManPower();
        this.initializeCountries();
        this.initializeFormGroup();
      }

    formGroup: FormGroup = new FormGroup({
        name: new FormControl<string>('', [Validators.required]),
        email: new FormControl<string>('', [Validators.required]),
        countryCode: new FormControl<string | null>('', [Validators.required]),
        phoneNumber: new FormControl<string>('', [Validators.required]),
        businessForm: new FormControl<string>('', [Validators.required]),
        category: new FormControl<string>('', [Validators.required]),
        kata: new FormControl('', [Validators.required, kataValidator]),
        businessYear: new FormControl<string>('', [Validators.required, businessYearValidator]),
        manPower: new FormControl<string>('', [Validators.required, manPowerValidator]),
        revenue: new FormControl<string>('', [Validators.required, revenueValidator]),
        message: new FormControl<string | null>(null, []),
      });

      handleCountryChange(event: any) {
        this.selectedCountry = event.value;
        this.formGroup.get('countryCode')?.setValue(event.value);
      }
    
    private initializeBusinessForms(){
        this.businessForms = [
            {name: 'Mikrovállalkozás'}, 
            {name: 'Kisvállalkozás'}
        ]
    }

    private initializeCatgories(){
        this.categories = [
            {name: 'Dél-Alföld'}, 
            {name: 'Dél-Dunántúl'},
            {name: 'Észak-Alföld'},
            {name: 'Észak-Magyarország'},
            {name: 'Szabad Vállalkozási Zóna'},
        ]
    }
    
    private initializeKatas(){
        this.katas = [
            {name: 'Igen'}, 
            {name: 'Nem'},
        ]
    }

    private initializeBusinessYears(){
        this.businessYears = [
            {name: 'Igen'}, 
            {name: 'Nem'},
        ]
    }

    private initializeManPower(){
        this.manPowers = [
            {name: 'Igen'}, 
            {name: 'Nem'},
        ]
    }

    get f(): { [key: string]: AbstractControl } {
        return this.formGroup.controls;
      }

    private initializeFormGroup(): void {
        this.formGroup = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required]],
            countryCode: ['', [Validators.required]],
            businessForm: ['', [Validators.required]],
            category: ['', [Validators.required]],
            kata: ['', [Validators.required, kataValidator]],
            businessYear: ['', [Validators.required, businessYearValidator]],
            manPower: ['', [Validators.required, manPowerValidator]],
            revenue: ['', [Validators.required, revenueValidator]],
            message: [null, []],
        });
    } 

    send(){
        if(!this.formGroup.valid) return;
        
        this.loadingService.enableLoader();
        const subject = 'Ginop plusz 1.2.4-24';
        
        this.emailService.sendCompetitionEmail(
            this.formGroup.controls['email'].value,
            subject,
            this.formGroup.controls['name'].value,
            this.formGroup.controls['countryCode'].value.code, 
            this.formGroup.controls['phoneNumber'].value.toString(),
            this.formGroup.controls['businessForm'].value.name,
            this.formGroup.controls['category'].value.name,
            this.formGroup.controls['kata'].value.name,
            this.formGroup.controls['businessYear'].value.name,
            this.formGroup.controls['manPower'].value.name,
            this.formGroup.controls['revenue'].value + "%",
            this.formGroup.controls['message'].value ?? null
        ).subscribe((resp) => {
            this.messageService.add({ key: 'comp', severity: 'success', summary: 'Siker!', detail: 'Sikeres e-mail küldés!' });
        }).add(() => this.loadingService.disableLoader());
    }
      
    download(){
        const link = document.createElement('a');
        link.href = '../../../assets/ÁTK Pályázati kérdések.docx';
        link.download = 'ÁTK Pályázati kérdések.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

    private initializeCountries(){
        this.countries = [
          { name: 'Magyarország', code: '+36' },
          { name: 'Szlovákia', code: '+421' },
          { name: 'Szlovénia', code: '+386' },
          { name: 'Románia', code: '+40' },
          { name: 'Afganisztán', code: '+93' },
          { name: 'Albánia', code: '+355' },
          { name: 'Algéria', code: '+213' },
          { name: 'Amerikai Egyesült Államok', code: '+1' },
          { name: 'Amerikai Szamoa', code: '+684' },
          { name: 'Amerikai Virgin-szigetek', code: '+1340' },
          { name: 'Andorra', code: '+376' },
          { name: 'Angola', code: '+244' },
          { name: 'Anguilla', code: '+1264' },
          { name: 'Antigua és Barbuda', code: '+1268' },
          { name: 'Antarktisz', code: '+672' },
          { name: 'Argentína', code: '+54' },
          { name: 'Aruba', code: '+297' },
          { name: 'Ascension', code: '+247' },
          { name: 'Ausztrália', code: '+61' },
          { name: 'Ausztrália külbirtokai (Antarktisz, Norfolk-sziget)', code: '+672' },
          { name: 'Ausztria', code: '+43' },
          { name: 'Azerbajdzsán', code: '+994' },
          { name: 'Bahama-szigetek', code: '+1242' },
          { name: 'Bahrein', code: '+973' },
          { name: 'Banglades', code: '+880' },
          { name: 'Barbados', code: '+1246' },
          { name: 'Barbuda', code: '+1268' },
          { name: 'Belgium', code: '+32' },
          { name: 'Belize', code: '+501' },
          { name: 'Benin', code: '+229' },
          { name: 'Bermuda', code: '+1441' },
          { name: 'Bhután', code: '+975' },
          { name: 'Bissau-Guinea', code: '+245' },
          { name: 'Bolívia', code: '+591' },
          { name: 'Bosznia-Hercegovina', code: '+387' },
          { name: 'Botswana', code: '+267' },
          { name: 'Brazília', code: '+55' },
          { name: 'Brit Virgin-szigetek', code: '+1284' },
          { name: 'Brunei', code: '+673' },
          { name: 'Bulgária', code: '+359' },
          { name: 'Burkina Faso', code: '+226' },
          { name: 'Burundi', code: '+257' },
          { name: 'Chile', code: '+56' },
          { name: 'Ciprus', code: '+357' },
          { name: 'Cocos-Keeling szigetek', code: '+61' },
          { name: 'Comore-szigetek', code: '+269' },
          { name: 'Cook-szigetek', code: '+682' },
          { name: 'Curaçao', code: '+599' },
          { name: 'Costa Rica', code: '+506' },
          { name: 'Csád', code: '+235' },
          { name: 'Csehország', code: '+420' },
          { name: 'Dánia', code: '+45' },
          { name: 'Dél-afrikai Köztársaság', code: '+27' },
          { name: 'Diego Garcia', code: '+246' },
          { name: 'Dominikai Közösség', code: '+1767' },
          { name: 'Dominikai Köztársaság', code: '+1809' },
          { name: 'Dzsibuti', code: '+253' },
          { name: 'Ecuador', code: '+593' },
          { name: 'Egyenlítői-Guinea', code: '+240' },
          { name: 'Egyesült Arab Emírségek', code: '+971' },
          { name: 'Egyiptom', code: '+20' },
          { name: 'Elefántcsontpart', code: '+225' },
          { name: 'Eritrea', code: '+291' },
          { name: 'Északi-Mariana-szigetek', code: '+1670' },
          { name: 'Észtország', code: '+372' },
          { name: 'Etiópia', code: '+251' },
          { name: 'Falkland-szigetek', code: '+500' },
          { name: 'Fehéroroszország (Belarusz)', code: '+375' },
          { name: 'Feröer-szigetek', code: '+298' },
          { name: 'Fidzsi-szigetek', code: '+679' },
          { name: 'Finnország', code: '+358' },
          { name: 'Francia Antillák', code: '+596' },
          { name: 'Francia Guyana', code: '+594' },
          { name: 'Francia Polinézia', code: '+689' },
          { name: 'Franciaország', code: '+33' },
          { name: 'Fülöp-szigetek', code: '+63' },
          { name: 'Gabon', code: '+241' },
          { name: 'Gambia', code: '+220' },
          { name: 'Ghána', code: '+233' },
          { name: 'Gibraltár', code: '+350' },
          { name: 'Görögország', code: '+30' },
          { name: 'Grenada', code: '+1473' },
          { name: 'Grönland', code: '+299' },
          { name: 'Grúzia', code: '+995' },
          { name: 'Guadeloupe', code: '+590' },
          { name: 'Guam', code: '+1671' },
          { name: 'Guantanamo', code: '+5399' },
          { name: 'Guatemala', code: '+502' },
          { name: 'Guinea', code: '+224' },
          { name: 'Guyana', code: '+592' },
          { name: 'Haiti', code: '+509' },
          { name: 'Holland Antillák', code: '+599' },
          { name: 'Hollandia', code: '+31' },
          { name: 'Honduras', code: '+504' },
          { name: 'Hong Kong', code: '+852' },
          { name: 'Horvátország', code: '+385' },
          { name: 'Húsvét-sziget', code: '+56' },
          { name: 'India', code: '+91' },
          { name: 'Indonézia', code: '+62' },
          { name: 'Irak', code: '+964' },
          { name: 'Irán', code: '+98' },
          { name: 'Írország', code: '+353' },
          { name: 'Izland', code: '+354' },
          { name: 'Izrael', code: '+972' },
          { name: 'Jamaica', code: '+1876' },
          { name: 'Japán', code: '+81' },
          { name: 'Jemen', code: '+967' },
          { name: 'Jordánia', code: '+962' },
          { name: 'Kajmán-szigetek', code: '+1345' },
          { name: 'Kambodzsa', code: '+855' },
          { name: 'Kamerun', code: '+237' },
          { name: 'Kanada', code: '+1' },
          { name: 'Karácsony-sziget', code: '+618' },
          { name: 'Katar', code: '+974' },
          { name: 'Kazahsztán', code: '+7' },
          { name: 'Kelet-Timor', code: '+670' },
          { name: 'Kenya', code: '+254' },
          { name: 'Kína', code: '+86' },
          { name: 'Kirgizisztán', code: '+996' },
          { name: 'Kiribati', code: '+686' },
          { name: 'Kolumbia', code: '+57' },
          { name: 'Kongó', code: '+242' },
          { name: 'Kongói Demokratikus Köztársaság (Zaire)', code: '+243' },
          { name: 'Koreai Köztársaság (Dél-Korea)', code: '+82' },
          { name: 'Koreai NDK (Észak-Korea)', code: '+850' },
          { name: 'Közép-afrikai Köztársaság', code: '+236' },
          { name: 'Kuba', code: '+53' },
          { name: 'Kuvait', code: '+965' },
          { name: 'Laosz', code: '+856' },
          { name: 'Lengyelország', code: '+48' },
          { name: 'Lesotho', code: '+266' },
          { name: 'Lettország', code: '+371' },
          { name: 'Libanon', code: '+961' },
          { name: 'Libéria', code: '+231' },
          { name: 'Líbia', code: '+218' },
          { name: 'Liechtenstein', code: '+423' },
          { name: 'Litvánia', code: '+370' },
          { name: 'Luxemburg', code: '+352' },
          { name: 'Macedónia', code: '+389' },
          { name: 'Madagaszkár', code: '+261' },
          { name: 'Makaó', code: '+853' },
          { name: 'Malajzia', code: '+60' },
          { name: 'Malawi', code: '+265' },
          { name: 'Maldív-szigetek', code: '+960' },
          { name: 'Mali', code: '+223' },
          { name: 'Málta', code: '+356' },
          { name: 'Marokkó', code: '+212' },
          { name: 'Marshall-szigetek', code: '+692' },
          { name: 'Martinique', code: '+596' },
          { name: 'Mauritánia', code: '+222' },
          { name: 'Mauritius', code: '+230' },
          { name: 'Mayotte', code: '+269' },
          { name: 'Mexikó', code: '+52' },
          { name: 'Mianmar', code: '+95' },
          { name: 'Midway', code: '+1808' },
          { name: 'Mikronézia', code: '+691' },
          { name: 'Moldova (Besszarábia)', code: '+373' },
          { name: 'Monaco', code: '+377' },
          { name: 'Mongólia', code: '+976' },
          { name: 'Montserrat', code: '+1664' },
          { name: 'Mozambik', code: '+258' },
          { name: 'Egyesült Királyság', code: '+44' },
          { name: 'Namíbia', code: '+264' },
          { name: 'Nauru', code: '+674' },
          { name: 'Németország', code: '+49' },
          { name: 'Nepál', code: '+977' },
          { name: 'Nevis', code: '+1869' },
          { name: 'Nicaragua', code: '+505' },
          { name: 'Niger', code: '+227' },
          { name: 'Nigéria', code: '+234' },
          { name: 'Niue', code: '+683' },
          { name: 'Norfolk-sziget', code: '+672' },
          { name: 'Norvégia', code: '+47' },
          { name: 'Olaszország', code: '+39' },
          { name: 'Omán', code: '+968' },
          { name: 'Oroszország', code: '+7' },
          { name: 'Örményország', code: '+374' },
          { name: 'Pakisztán', code: '+92' },
          { name: 'Palau', code: '+680' },
          { name: 'Palesztin Önkormányzati Területek', code: '+970' },
          { name: 'Panama', code: '+507' },
          { name: 'Pápua Új-Guinea', code: '+675' },
          { name: 'Paraguay', code: '+595' },
          { name: 'Peru', code: '+51' },
          { name: 'Portugália', code: '+351' },
          { name: 'Puerto Rico 1787', code: '+1787' },
          { name: 'Puerto Rico 1939', code: '+1939' },
          { name: 'Réunion', code: '+262' },
          { name: 'Ruanda', code: '+250' },
          { name: 'Saint Kitts és Nevis', code: '+1869' },
          { name: 'Saint Lucia', code: '+1758' },
          { name: 'Saint Vincent és a Grenadine-szigetek', code: '+1784' },
          { name: 'Saint-Pierre és Miquelon', code: '+508' },
          { name: 'Salamon-szigetek', code: '+677' },
          { name: 'Salvador', code: '+503' },
          { name: 'San Marino', code: '+378' },
          { name: 'Sao Tomé és Príncipe', code: '+239' },
          { name: 'Seychelles-szigetek', code: '+248' },
          { name: 'Sierra Leone', code: '+232' },
          { name: 'Spanyolország', code: '+34' },
          { name: 'Sri Lanka', code: '+94' },
          { name: 'Suriname', code: '+597' },
          { name: 'Svájc', code: '+41' },
          { name: 'Svédország', code: '+46' },
          { name: 'Szamoa (amerikai)', code: '+684' },
          { name: 'Szamoa (Nyugat)', code: '+685' },
          { name: 'Szaúd-Arábia', code: '+966' },
          { name: 'Szenegál', code: '+221' },
          { name: 'Szent Ilona sziget', code: '+290' },
          { name: 'Szerbia és Montenegro', code: '+381' },
          { name: 'Szingapúr', code: '+65' },
          { name: 'Szíria', code: '+963' },
          { name: 'Szomália', code: '+252' },
          { name: 'Szudán', code: '+249' },
          { name: 'Szváziföld', code: '+268' },
          { name: 'Tádzsikisztán', code: '+992' },
          { name: 'Tajvan', code: '+886' },
          { name: 'Tanzánia (beleértve Zanzibárt is)', code: '+255' },
          { name: 'Thaiföld', code: '+66' },
          { name: 'Togo', code: '+228' },
          { name: 'Tokelau-szigetek', code: '+690' },
          { name: 'Tonga', code: '+676' },
          { name: 'Törökország', code: '+90' },
          { name: 'Trinidad és Tobago', code: '+1868' },
          { name: 'Tunézia', code: '+216' },
          { name: 'Turks- és Caicos-szigetek', code: '+1649' },
          { name: 'Tuvalu', code: '+688' },
          { name: 'Türkmenisztán', code: '+993' },
          { name: 'Uganda', code: '+256' },
          { name: 'Ukrajna', code: '+380' },
          { name: 'Uruguay', code: '+598' },
          { name: 'Új-Kaledónia', code: '+687' },
          { name: 'Új-Zéland', code: '+64' },
          { name: 'Üzbegisztán', code: '+998' },
          { name: 'Vanuatu', code: '+678' },
          { name: 'Vatikán', code: '+379' },
          { name: 'Vatikán 39', code: '+39' },
          { name: 'Venezuela', code: '+58' },
          { name: 'Vietnam', code: '+84' },
          { name: 'Wake-sziget', code: '+808' },
          { name: 'Wallis és Futuna', code: '+681' },
          { name: 'Zambia', code: '+260' },
          { name: 'Zimbabwe', code: '+263' },
          { name: 'Zöld-foki Köztársaság', code: '+238' }
        ];
      }
}
interface Option {
    name: string
}

export const kataValidator: ValidatorFn = (control:AbstractControl): ValidationErrors | null =>{
    const option = control.value.name
    
    if (control.value && control.value.name === 'Igen') {
        return { kataError: true };
    }
    return null
}

export const businessYearValidator: ValidatorFn = (control:AbstractControl): ValidationErrors | null =>{
    const option = control.value.name
    
    if (control.value && control.value.name === 'Nem') {
        return { businessYearError: true };
    }
    return null
}

export const manPowerValidator: ValidatorFn = (control:AbstractControl): ValidationErrors | null =>{
    const option = control.value.name
    
    if (control.value && control.value.name === 'Nem') {
        return { manPowerError: true };
    }
    return null
}

export const revenueValidator: ValidatorFn = (control:AbstractControl): ValidationErrors | null =>{
    const option = control.value
    
    if (control.value && control.value > 50) {
        return { revenueError: true };
    }
    return null
}

interface Country {
    name: string,
    code: string,
}