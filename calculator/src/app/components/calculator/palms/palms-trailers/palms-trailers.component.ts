import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ConfigItem } from '../../../../models/config-item';
import { PalmsTrailersService } from '../palms-trailers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-palms-trailers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [PalmsTrailersService],
  templateUrl: './palms-trailers.component.html',
  styleUrl: './palms-trailers.component.css'
})

export class PalmsTrailersComponent implements OnInit {
  constructor(private palmsTrailerService: PalmsTrailersService){}
  trailers: any = [];

  ngOnInit(): void {
    this.palmsTrailerService.getTrailers().subscribe((resp) => {
      console.log(resp);
      this.trailers = resp;
    })
}
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
}
