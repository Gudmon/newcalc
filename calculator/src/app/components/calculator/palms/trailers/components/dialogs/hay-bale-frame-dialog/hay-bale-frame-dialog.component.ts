import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-hay-bale-frame-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './hay-bale-frame-dialog.component.html',
  styleUrl: './hay-bale-frame-dialog.component.css'
})
export class HayBaleFrameDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) hayBaleFrameDialogVisible: boolean = false;
  @Input({required: true}) hayBaleFrame!: ConfigurationItem

  closeHayBaleFrameDialog() {
    this.dialogVisible.emit();
  }
}
