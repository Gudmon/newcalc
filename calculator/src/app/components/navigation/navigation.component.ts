import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
    selector: 'app-navigation',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    encapsulation: ViewEncapsulation.None,
    imports: [RouterOutlet, MenubarModule, NavigationComponent]
})
export class NavigationComponent implements OnInit {
constructor(){

}

  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Kezdőlap',
                routerLink: '/'
            },
            {
                label: 'Rólunk',
                routerLink: '/about'
            },
            {
                label: 'Termékek',
                items: [
                    {
                        label: 'Krpan erdészeti gépek',
                        routerLink: '/krpan'
                    },
                    {
                        label: 'Palms erdészeti gépek',
                        routerLink: '/palms'
                    },
                    {
                        label: 'Palmse trailer',
                        routerLink: '/palmse'
                    },
                    {
                      label: 'Adalékok',
                      routerLink: '/additives'
                    }
                ]
            },
            {
                label: 'Gépbérbeadás',
                routerLink: '/rental'
            },
            {
                label: 'Webshop',
                routerLink: '/webshop'
            },
            {
                label: 'Hírek',
                routerLink: '/news'
            },
            {
                label: 'Kapcsolat',
                routerLink: '/contact'
            },
            {
                label: 'Kalkulátorok',
                items: [
                  {
                      label: 'Krpan',
                      routerLink: '/calculator/krpan'
                  },
                  {
                      label: 'Palms',
                      routerLink: '/calculator/palms'
                  }
              ]
            },
        ];
    }
}
