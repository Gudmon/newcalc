import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from "../../../navigation/navigation.component";
import { FooterComponent } from "../../../footer/footer.component";
import { PalmsTrailersService } from '../palms-trailers.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PalmsTrailersComponent } from "../palms-trailers/palms-trailers.component";

@Component({
    selector: 'app-palms-overview',
    standalone: true,
    templateUrl: './palms-overview.component.html',
    styleUrl: './palms-overview.component.css',
    imports: [NavigationComponent, FooterComponent, PalmsTrailersComponent]
})
export class PalmsOverviewComponent {
    constructor(){}

    
}
