import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-cover-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './cover-dialog.component.html',
  styleUrl: './cover-dialog.component.css'
})
export class CoverDialogComponent {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) coverDialogVisible: boolean = false;
  readonly imageIds = [1, 2];

  closeCoverDialog() {
    this.dialogVisible.emit();
  }
}
