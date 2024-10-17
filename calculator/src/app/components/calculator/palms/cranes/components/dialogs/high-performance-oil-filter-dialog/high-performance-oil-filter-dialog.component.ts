import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-high-performance-oil-filter-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './high-performance-oil-filter-dialog.component.html',
  styleUrl: './high-performance-oil-filter-dialog.component.css'
})
export class HighPerformanceOilFilterDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) highPerformanceOilFilterDialogVisible: boolean = false;
  @Input({required: true}) highPerformanceOilFilter!: ConfigurationItem;

  closeHighPerformanceOilFilterDialog() {
    this.dialogVisible.emit();
  }
}
