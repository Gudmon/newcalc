import { Component, OnDestroy, OnInit  } from '@angular/core';
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

declare var cookieconsent: any;
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ProgressSpinnerModule, ProductListComponent, MenubarModule, NavigationComponent, LandingComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;
  readonly loading$ = this.loadingService.status$;

  constructor(
    private readonly loadingService: LoadingService,
    private readonly router: Router){}
    private scriptLoaded = false;
    
    initialize() {
        if (typeof cookieconsent !== 'undefined') {
          cookieconsent.run({
            "notice_banner_type": "simple",
            "consent_type": "express",
            "palette": "dark",
            "language": "hu",
            "page_load_consent_levels": ["strictly-necessary"],
            "notice_banner_reject_button_hide": false,
            "preferences_center_close_button_hide": false,
            "page_refresh_confirmation_buttons": false,
            "website_name": "www.palmsmagyarorszag.hu"
          });
        } else {
          console.error('Cookie Consent script not loaded.');
        }
    }

    private loadScript(url: string, callback?: (ev: Event) => any): void {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.async = true;
    
    if (callback) {
        script.onload = callback.bind(this);
    }
    document.head.appendChild(script);
    }

    ngOnInit() {
        this.loadScript('https://www.termsfeed.com/public/cookie-consent/4.1.0/cookie-consent.js', this.initialize);

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
