import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurationItem } from '../../../../../../models/configuration-item';

@Component({
  selector: 'app-light-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './light-dialog.component.html',
  styleUrl: './light-dialog.component.css'
})
export class LightDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) lightsDialogVisible: boolean = false;
  @Input({required: true}) lights!: ConfigurationItem []

  closeLightsDialog() {
    this.dialogVisible.emit();
  }
}
