import { CalculatorService } from './../../../services/calculator.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { CranesComponent } from '../cranes/cranes.component';
import { TrailersComponent } from '../trailers/trailers.component';
import { ButtonModule } from 'primeng/button';
import { NavigationComponent } from '../../navigation/navigation.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CranesComponent, TrailersComponent, SelectButtonModule, FormsModule, CarouselModule, ReactiveFormsModule, ButtonModule, NavigationComponent, FooterComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit{
  vehicleTypes: any[] = [];
  value!: number;
  selectedTab: number |undefined;
  tabSelected : boolean = false;
  @ViewChild('craneComponent') craneComponent!: any;

  constructor(readonly calculatorService: CalculatorService){

  }
  
  ngOnInit(): void {
    this.setVehicleTypes();
  }

  setSetelectedTab(tab: number, event: Event){
    this.calculatorService._selectedTab.next(tab);
    this.selectedTab = tab;
    this.tabSelected = true;
    

    setTimeout(() => {
      if(this.craneComponent){
        this.craneComponent.el.nativeElement.scrollIntoView({ behavior: "smooth"});
        console.log(this.craneComponent);
      }
      
    }, 100);
  }

  private setVehicleTypes(){
    this.vehicleTypes = [
      { name: 'Daruk', value: 1 },
      { name: 'Pótkocsik', value: 2 },
      { name: 'Közelítő pótkocsik', value: 3 }
    ];
  }
}
