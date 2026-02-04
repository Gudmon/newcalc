import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
    selector: 'app-navigation',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    encapsulation: ViewEncapsulation.None,
    imports: [MenubarModule]
})
export class NavigationComponent implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Kezdőlap',
                routerLink: '/'
            },
            {
                label: 'Kalkulátor',
                routerLink: '/calculator/palms'
            },
            {
                label: 'Ügyféltérkép',
                routerLink: '/customer-map'
            },
            {
                label: 'Olvasmányok',
                routerLink: '/useful-reading'
            }
            // {
            //     label: 'Pályázat',
            //     routerLink: '/competition',
            //     icon: 'pi pi-exclamation-circle'
            // },
        ];
    }
}
