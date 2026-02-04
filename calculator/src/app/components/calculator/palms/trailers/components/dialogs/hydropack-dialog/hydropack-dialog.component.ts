import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-hydropack-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './hydropack-dialog.component.html',
  styleUrl: './hydropack-dialog.component.css'
})
export class HydropackDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) hydropacksDialogVisible: boolean = false;
  @Input({required: true}) hydropacks!: ConfigurationItem []

  closeHydropacksDialog() {
    this.dialogVisible.emit();
  }
}
