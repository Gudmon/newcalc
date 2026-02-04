import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-dbox-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './dbox-dialog.component.html',
  styleUrl: './dbox-dialog.component.css'
})
export class DboxDialogComponent {
@Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) dBoxDialogVisible: boolean = false;
  @Input({required: true}) dBox!: ConfigurationItem

  closeDboxDialog() {
    this.dialogVisible.emit();
  }
}
