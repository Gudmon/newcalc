import { Component, OnInit } from '@angular/core';
import { PalmsService } from '../../../palms/shared/services/palms.service';
import { PdfService } from '../../../../../services/pdf.service';
import { ConfigurationItem } from '../../../../../models/configuration-item';
import { concatMap } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../../../services/email.service';
import { LoadingService } from '../../../../../services/loading.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'app-pdf',
    standalone: true,
    providers: [MessageService],
    imports: [FormsModule, ReactiveFormsModule, CommonModule, ToastModule, DropdownModule],
    templateUrl: './pdf.component.html',
    styleUrl: './pdf.component.css'
})
export class PdfComponent implements OnInit {
    submitted: boolean = false;
    blurred: boolean = false;
    pdfSaved: boolean = false;

    countries!: Country[];
    selectedCountry!: Country;

    constructor(
        private readonly palmsService: PalmsService,
        private readonly pdfService: PdfService,
        private readonly emailService: EmailService,
        private readonly loadingService: LoadingService,
        private readonly messageService: MessageService,
        private readonly fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initializeFormGroup();
        this.initializeCountries();
    }

    formGroup: FormGroup = new FormGroup({
        name: new FormControl<string>(''),
        email: new FormControl<string>(''),
        countryCode: new FormControl<string | null>(''),
        phoneNumber: new FormControl<string>(''),
        message: new FormControl<string>('')
    });

    private initializeFormGroup(): void {
        this.formGroup = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            countryCode: [null, Validators.required],
            phoneNumber: ['', Validators.required],
            message: ['', Validators.required]
        });
    }

    private initializeCountries() {
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

    handleCountryChange(event: any) {
        this.selectedCountry = event.value;
        this.formGroup.get('countryCode')?.setValue(event.value);
    }

    onEmailBlur() {
        this.blurred = true;
    }

    get f(): { [key: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.formGroup.valid) {
            this.sendEmail();
        }
    }

    getOptionLabel(): string | undefined {
        return 'kiskutya';
    }

    sendPdfAndDownload() {
        const object: PdfModel = {
            totalPrice: '',
            trailerName: undefined,
            craneName: undefined,
            singleOptions: [],
            multipleOptions: []
        };
        if (this.palmsService._trailerSelected.value === true) {
            object.trailerName = this.palmsService._selectedTrailer.value?.name;

            const woodSorter = this.palmsService.selectedWoodSorter();
            const newWoodSorter: ConfigurationItem | undefined = woodSorter
                ? {
                      ...woodSorter,
                      price: woodSorter.price.toString()
                  }
                : undefined;

            const bunkAdapter = this.palmsService.selectedBunkAdapter();
            const newBunkAdapter: ConfigurationItem | undefined = bunkAdapter
                ? {
                      ...bunkAdapter,
                      price: bunkAdapter.price.toString()
                  }
                : undefined;
            const bunkExtension = this.palmsService.selectedBunkExtension();
            const newBunkExtension: ConfigurationItem | undefined = bunkExtension
                ? {
                      ...bunkExtension,
                      price: bunkExtension.price.toString()
                  }
                : undefined;
            const manualBunkExtension = this.palmsService.selectedManualBunkExtension();
            const newManualBunkExtension: ConfigurationItem | undefined = manualBunkExtension
                ? {
                      ...manualBunkExtension,
                      price: manualBunkExtension.price.toString()
                  }
                : undefined;
            const stanchionExtension = this.palmsService.selectedStanchionExtension();
            const newStanchionExtension: ConfigurationItem | undefined = stanchionExtension
                ? {
                      ...stanchionExtension,
                      price: stanchionExtension.price.toString()
                  }
                : undefined;

            this.addSingleOption(object, OptionGroup.Stanchion, this.palmsService.selectedStanchion());
            this.addSingleOption(object, OptionGroup.Brake, this.palmsService.selectedBrake());
            this.addSingleOption(object, OptionGroup.Propulsion, this.palmsService.selectedPropulsion());
            this.addSingleOption(object, OptionGroup.Drawbar, this.palmsService.selectedDrawbar());
            this.addSingleOption(object, OptionGroup.Platform, this.palmsService.selectedPlatform());
            this.addSingleOption(object, OptionGroup.OilPump, this.palmsService.selectedOilPump());
            this.addSingleOption(object, OptionGroup.OilTank, this.palmsService.selectedOilTank());
            this.addSingleOption(object, OptionGroup.TrailerOilCooler, this.palmsService.selectedTrailerOilCooler());
            this.addSingleOption(object, OptionGroup.BolsterLock, this.palmsService.selectedBolsterLock());
            this.addSingleOption(object, OptionGroup.BBox, this.palmsService.selectedBBox());
            this.addSingleOption(object, OptionGroup.DBox, this.palmsService.selectedDBox());
            this.addSingleOption(object, OptionGroup.Toolbox, this.palmsService.selectedToolbox());
            this.addSingleOption(object, OptionGroup.HayBaleFrame, this.palmsService.selectedHayBaleFrame());
            this.addSingleOption(object, OptionGroup.HandBrake, this.palmsService.selectedHandBrake());
            this.addSingleOption(object, OptionGroup.ChainsawHolder, this.palmsService.selectedChainsawHolder());
            this.addSingleOption(object, OptionGroup.UnderrunProtection, this.palmsService.selectedUnderrunProtection());
            this.addSingleOption(object, OptionGroup.FrameExtension, this.palmsService.selectedFrameExtension());
            this.addSingleOption(object, OptionGroup.StanchionExtension, newStanchionExtension);
            this.addSingleOption(object, OptionGroup.WoodSorter, newWoodSorter);
            this.addSingleOption(object, OptionGroup.BunkAdapter, newBunkAdapter);
            this.addSingleOption(object, OptionGroup.BunkExtension, newBunkExtension);
            this.addSingleOption(object, OptionGroup.ManualBunkExtension, newManualBunkExtension);
            this.addSingleOption(object, OptionGroup.TrailerLight, this.palmsService.selectedTrailerLight());
            this.addSingleOption(object, OptionGroup.SupportLeg, this.palmsService.selectedSupportLeg());
            this.addSingleOption(object, OptionGroup.HydroPack, this.palmsService.selectedHydroPack());
            this.addSingleOption(object, OptionGroup.Tyre, this.palmsService.selectedTyre());
            this.addSingleOption(object, OptionGroup.TrailerShipping, this.palmsService.selectedTrailerShipping());
            this.addSingleOption(object, OptionGroup.MOT, this.palmsService.selectedMOT());
        } else {
            this.addMultipleOption(object, OptionGroup.Grapple, []);
        }

        if (this.palmsService._craneSelected.value === true) {
            object.craneName = this.palmsService._selectedCrane.value?.name;

            const craneOption: PdfItem = {
                id: Number(this.palmsService._selectedCrane.value?.id) ?? 0,
                name: this.palmsService._selectedCrane.value?.name ?? '',
                code: '',
                price: this.palmsService._selectedCrane.value?.price.toString() ?? '0',
                namePrice: `${this.palmsService._selectedCrane.value?.name ?? ''} - ${this.palmsService._selectedCrane.value?.price.toString() ?? '0'}`
            };
            this.addSingleOption(object, OptionGroup.Crane, craneOption);
            this.addSingleOption(object, OptionGroup.ControlBlock, this.palmsService.selectedControlBlock());
            this.addSingleOption(object, OptionGroup.FrameType, this.palmsService.selectedFrameType());
            this.addSingleOption(object, OptionGroup.Winch, this.palmsService.selectedWinch());
            this.addSingleOption(object, OptionGroup.ProtectionSleeves, this.palmsService.selectedProtectionSleeves());
            this.addSingleOption(object, OptionGroup.ElectricalFloating, this.palmsService.selectedElectricalFloating());
            this.addSingleOption(object, OptionGroup.ValveBlock, this.palmsService.selectedValveBlock());
            this.addSingleOption(object, OptionGroup.Damping, this.palmsService.selectedDamping());
            this.addSingleOption(object, OptionGroup.CraneLight, this.palmsService.selectedCraneLight());
            this.addSingleOption(object, OptionGroup.OperatorSeat, this.palmsService.selectedOperatorSeat());
            this.addSingleOption(object, OptionGroup.HighPerformanceOilFilter, this.palmsService.selectedHighPerformanceOilFilter());
            this.addSingleOption(object, OptionGroup.CraneOilCooler, this.palmsService.selectedCraneOilCooler());
            this.addSingleOption(object, OptionGroup.Rotator, this.palmsService.selectedRotator());
            this.addSingleOption(object, OptionGroup.RotatorBrake, this.palmsService.selectedRotatorBrake());
            this.addSingleOption(object, OptionGroup.JoystickHolder, this.palmsService.selectedJoystickHolder());
            this.addSingleOption(object, OptionGroup.HoseGuard, this.palmsService.selectedHoseGuard());
            this.addSingleOption(object, OptionGroup.TurningDeviceCounterPlate, this.palmsService.selectedTurningDeviceCounterPlate());
            this.addSingleOption(object, OptionGroup.SupportLegCounterPlate, this.palmsService.selectedSupportLegCounterPlate());
            this.addSingleOption(object, OptionGroup.BoomGuard, this.palmsService.selectedBoomGuard());
            this.addSingleOption(object, OptionGroup.Cover, this.palmsService.selectedCover());
            this.addSingleOption(object, OptionGroup.WoodControl, this.palmsService.selectedWoodControl());
            this.addSingleOption(object, OptionGroup.Linkage, this.palmsService.selectedLinkage());
            this.addSingleOption(object, OptionGroup.SupportBracket, this.palmsService.selectedSupportBracket());
            const single = this.palmsService.selectedGrapple();
            const multi = this.palmsService.selectedGrapples;
            const allGrapples: ConfigurationItem[] = [...(single ? [single] : []), ...multi.filter((g): g is ConfigurationItem => !!g)];
            this.addMultipleOption(object, OptionGroup.Grapple, allGrapples);
            this.addSingleOption(object, OptionGroup.CraneShipping, this.palmsService.selectedCraneShipping());
        } else {
            this.addMultipleOption(object, OptionGroup.Grapple, []);
        }

        object.totalPrice = this.palmsService._totalPrice().toString();

        this.loadingService.enableLoader();
        this.pdfService
            .sendPdf(object)
            .pipe(
                concatMap((resp) => {
                    this.pdfService.pdfId.set(resp.id);
                    return this.pdfService.getUserPdf(resp.id);
                })
            )
            .subscribe((blob: Blob) => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `${this.pdfService.pdfId()}.pdf`;
                link.click();
                this.pdfSaved = true;
            })
            .add(() => this.loadingService.disableLoader());
    }

    sendEmail() {
        const subject = `Sikeres kalkuláció - ${this.pdfService.pdfId()}`;
        const blobName = this.pdfService.pdfId().toString();

        this.loadingService.enableLoader();

        this.emailService
            .sendEmail(
                this.formGroup.controls['email'].value,
                subject,
                this.formGroup.controls['message'].value,
                this.formGroup.controls['name'].value,
                this.formGroup.controls['countryCode'].value.code,
                this.formGroup.controls['phoneNumber'].value.toString(),
                blobName
            )
            .subscribe({
                next: () => {
                    this.messageService.add({
                        key: 'tc',
                        severity: 'success',
                        summary: 'Siker!',
                        detail: 'Sikeres e-mail küldés!'
                    });
                },
                error: (err) => {
                    const header = err?.error?.header ?? 'Hiba';
                    const message = err?.error?.message ?? 'Az e-mail küldése nem sikerült.';

                    this.messageService.add({
                        key: 'tc',
                        severity: 'error',
                        summary: header,
                        detail: message
                    });
                }
            })
            .add(() => {
                this.submitted = false;
                this.loadingService.disableLoader();
            });
    }

    getPdf() {
        this.loadingService.enableLoader();
        this.pdfService
            .getUserPdf(this.pdfService.pdfId())
            .subscribe((resp) => {
                const blob = new Blob([resp], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'file.pdf';
                link.click();
            })
            .add(() => this.loadingService.disableLoader());
    }

    private addSingleOption(model: PdfModel, group: OptionGroup, item?: ConfigurationItem) {
        if (!item) return;

        model.singleOptions.push({
            group,
            option: item
        });
    }

    private addMultipleOption(model: PdfModel, group: OptionGroup, items?: ConfigurationItem[]) {
        if (!items || items.length === 0) return;

        model.multipleOptions.push({
            group,
            options: items
        });
    }
}

interface PdfTrailerModel {
    TrailerName?: string | undefined;
    Stanchion?: ConfigurationItem | undefined;
    Brake?: ConfigurationItem | undefined;
    Propulsion?: ConfigurationItem | undefined;
    Drawbar?: ConfigurationItem | undefined;
    Platform?: ConfigurationItem | undefined;
    OilPump?: ConfigurationItem | undefined;
    OilTank?: ConfigurationItem | undefined;
    TrailerOilCooler?: ConfigurationItem | undefined;
    BolsterLock?: ConfigurationItem | undefined;
    BBox?: ConfigurationItem | undefined;
    DBox?: ConfigurationItem | undefined;
    HayBaleFrame?: ConfigurationItem | undefined;
    WoodSorter?: ConfigurationItem | undefined;
    HandBrake?: ConfigurationItem | undefined;
    ChainsawHolder?: ConfigurationItem | undefined;
    UnderrunProtection?: ConfigurationItem | undefined;
    BunkAdapter?: ConfigurationItem | undefined;
    BunkExtension?: ConfigurationItem | undefined;
    ManualBunkExtension?: ConfigurationItem | undefined;
    FrameExtension?: ConfigurationItem | undefined;
    TrailerLight?: ConfigurationItem | undefined;
    SupportLeg?: ConfigurationItem | undefined;
    Tyre?: ConfigurationItem | undefined;
    TrailerShipping?: ConfigurationItem | undefined;
    MOT?: ConfigurationItem | undefined;
    StanchionExtension?: ConfigurationItem | undefined;
    HydroPack?: ConfigurationItem | undefined;
    SupplyFormat?: ConfigurationItem | undefined;
    Toolbox?: ConfigurationItem | undefined;
}

interface PdfCraneModel {
    Crane?: ConfigurationItem | undefined;
    ControlBlock?: ConfigurationItem | undefined;
    FrameType?: ConfigurationItem | undefined;
    Rotator?: ConfigurationItem | undefined;
    Grapple?: ConfigurationItem | undefined;
    Grapples?: (ConfigurationItem | undefined)[];
    Winch?: ConfigurationItem | undefined;
    ProtectionSleeves?: ConfigurationItem | undefined;
    ElectricalFloating?: ConfigurationItem | undefined;
    ValveBlock?: ConfigurationItem | undefined;
    Damping?: ConfigurationItem | undefined;
    CraneLight?: ConfigurationItem | undefined;
    HighPerformanceOilFilter?: ConfigurationItem | undefined;
    OperatorSeat?: ConfigurationItem | undefined;
    CraneOilCooler?: ConfigurationItem | undefined;
    RotatorBrake?: ConfigurationItem | undefined;
    JoystickHolder?: ConfigurationItem | undefined;
    HoseGuard?: ConfigurationItem | undefined;
    TurningDeviceCounterPlate?: ConfigurationItem | undefined;
    SupportLegCounterPlate?: ConfigurationItem | undefined;
    BoomGuard?: ConfigurationItem | undefined;
    Cover?: ConfigurationItem | undefined;
    WoodControl?: ConfigurationItem | undefined;
    Linkage?: ConfigurationItem | undefined;
    SupportBracket?: ConfigurationItem | undefined;
    CraneShipping?: ConfigurationItem | undefined;
}

export interface PdfModel extends PdfTrailerModel, PdfCraneModel {
    totalPrice: string;
    trailerName?: string;
    craneName?: string;
    singleOptions: SinglePdfOption[];
    multipleOptions: MultiplePdfOption[];
}

interface Country {
    name: string;
    code: string;
}

interface SinglePdfOption {
    group: OptionGroup;
    option: PdfItem;
}

interface MultiplePdfOption {
    group: OptionGroup;
    options: PdfItem[];
}

interface PdfOption {
    group: OptionGroup;
}

type PdfItem = Pick<ConfigurationItem, 'id' | 'name' | 'code' | 'price' | 'namePrice'>;

export enum OptionGroup {
    //TRAILER
    Stanchion,
    Brake,
    Propulsion,
    Drawbar,
    Platform,
    HydroPack,
    OilPump,
    OilTank,
    TrailerOilCooler,
    BolsterLock,
    BBox,
    DBox,
    Toolbox,
    HayBaleFrame,
    WoodSorter,
    HandBrake,
    ChainsawHolder,
    UnderrunProtection,
    BunkAdapter,
    BunkExtension,
    ManualBunkExtension,
    FrameExtension,
    StanchionExtension,
    SupportLeg,
    TrailerLight,
    Tyre,
    TrailerShipping,
    MOT,

    //CRANE
    Crane,
    ControlBlock,
    FrameType,
    Grapple,
    Winch,
    ProtectionSleeves,
    ElectricalFloating,
    ValveBlock,
    Damping,
    CraneLight,
    OperatorSeat,
    HighPerformanceOilFilter,
    CraneOilCooler,
    Rotator,
    RotatorBrake,
    JoystickHolder,
    HoseGuard,
    TurningDeviceCounterPlate,
    SupportLegCounterPlate,
    BoomGuard,
    Cover,
    WoodControl,
    Linkage,
    SupportBracket,
    CraneShipping
}
