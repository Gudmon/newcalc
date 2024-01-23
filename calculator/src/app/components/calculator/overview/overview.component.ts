import { CalculatorService } from './../../../services/calculator.service';
import { Component, OnInit } from '@angular/core';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { CranesComponent } from '../cranes/cranes.component';
import { TrailersComponent } from '../trailers/trailers.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CranesComponent, TrailersComponent, SelectButtonModule, FormsModule, CarouselModule, ReactiveFormsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit{
  vehicleTypes: any[] = [];
  value!: number;

  constructor(readonly calculatorService: CalculatorService){

  }
  
  ngOnInit(): void {
    this.setVehicleTypes();
  }

  setSetelectedTab(event: SelectButtonChangeEvent){
    this.calculatorService._selectedTab.next(event.value)
  }

  private setVehicleTypes(){
    this.vehicleTypes = [
      { name: 'Daruk', value: 1 },
      { name: 'Pótkocsik', value: 2 },
      { name: 'Közelítő pótkocsik', value: 3 }
    ];
  }
}
