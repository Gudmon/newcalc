import { Component  } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api/menuitem';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { LandingComponent } from "./landing/landing.component";
import { FooterComponent } from './components/footer/footer.component';
import { LoadingService } from './services/loading.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ProgressSpinnerModule, ProductListComponent, MenubarModule, NavigationComponent, LandingComponent, FooterComponent]
})
export class AppComponent {
  items: MenuItem[] | undefined;
  readonly loading$ = this.loadingService.status$;

  constructor(
    private readonly loadingService: LoadingService,
    private readonly router: Router){}

    ngOnInit() {
        this.items = [
            {
                label: 'Kezdőlap'
            },
            
            {
                label: 'Kalkulátorok',
                items: [
                  {
                      label: 'Krpan'
                  },
                  {
                      label: 'Palms'
                  }
              ]
            },
        ];

        this.router.events.subscribe((event) => { 
            if (!(event instanceof NavigationEnd)) { 
                return; 
            }  
            window.scrollTo(0, 0) 
        }); 
    }
}
