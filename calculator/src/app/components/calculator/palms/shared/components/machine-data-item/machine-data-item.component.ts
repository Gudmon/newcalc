import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-trailer-data-item',
    standalone: true,
    imports: [],
    templateUrl: './machine-data-item.component.html',
    styleUrl: './machine-data-item.component.css'
})
export class TrailerDataItemComponent {
    @Input({ required: true }) text!: string;
    @Input({ required: true }) property!: string;
    @Input() unit?: string;
}
