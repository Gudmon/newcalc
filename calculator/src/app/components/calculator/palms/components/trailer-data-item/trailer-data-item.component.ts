import { Component, Input } from '@angular/core';
import { PalmsTrailer } from '../../models/palms-trailer';

@Component({
  selector: 'app-trailer-data-item',
  standalone: true,
  imports: [],
  templateUrl: './trailer-data-item.component.html',
  styleUrl: './trailer-data-item.component.css'
})
export class TrailerDataItemComponent {
  @Input({required: true}) text!: string
  @Input() unit?: string
  @Input({required: true}) property!: string
}
