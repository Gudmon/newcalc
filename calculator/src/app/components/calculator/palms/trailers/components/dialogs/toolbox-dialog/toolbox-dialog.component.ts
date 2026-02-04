import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../../models/configuration-item';

@Component({
  selector: 'app-toolbox-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './toolbox-dialog.component.html',
  styleUrl: './toolbox-dialog.component.css'
})
export class ToolboxDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) toolboxDialogVisible: boolean = false;
  @Input({required: true}) toolbox!: ConfigurationItem

  closeToolboxDialog() {
    this.dialogVisible.emit();
  }
}
