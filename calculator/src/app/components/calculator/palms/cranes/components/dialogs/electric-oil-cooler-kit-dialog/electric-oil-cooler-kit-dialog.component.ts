import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-electric-oil-cooler-kit-dialog',
    standalone: true,
    imports: [DialogModule],
    templateUrl: './electric-oil-cooler-kit-dialog.component.html'
})
export class ElectricOilCoolerKitDialogComponent {
    @Output() dialogVisible = new EventEmitter<void>();
    @Input({ required: true }) electricOilCoolerKitDialogVisible = false;

    closeDialog() {
        this.dialogVisible.emit();
    }
}
