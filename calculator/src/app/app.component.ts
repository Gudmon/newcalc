import { Component  } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api/menuitem';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { LandingComponent } from "./landing/landing.component";
import { FooterComponent } from './components/footer/footer.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, ProductListComponent, MenubarModule, NavigationComponent, LandingComponent, FooterComponent]
})
export class AppComponent {
  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Kezdőlap'
            },
            {
                label: 'Rólunk'
            },
            {
                label: 'Termékek',
                items: [
                    {
                        label: 'Krpan erdészeti gépek'
                    },
                    {
                        label: 'Palms erdészeti gépek'
                    },
                    {
                        label: 'Palmse trailer'
                    },
                    {
                      label: 'Adalékok'
                    }
                ]
            },
            {
                label: 'Gépbérbeadás'
            },
            {
                label: 'Webshop'
            },
            {
                label: 'Hírek'
            },
            {
                label: 'Kapcsolat'
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
    }
}
