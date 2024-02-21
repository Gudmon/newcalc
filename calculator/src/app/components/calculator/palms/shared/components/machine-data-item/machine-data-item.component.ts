import { Component, Input } from '@angular/core';
import { PalmsTrailer } from '../../../trailers/models/palms-trailer';

@Component({
  selector: 'app-trailer-data-item',
  standalone: true,
  imports: [],
  templateUrl: './machine-data-item.component.html',
  styleUrl: './machine-data-item.component.css'
})
export class TrailerDataItemComponent {
  @Input({required: true}) text!: string
  @Input() unit?: string
  @Input({required: true}) property!: string
}
