import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FrameType } from '../../../models/frame-type';


@Component({
  selector: 'app-frame-types-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './frame-types-dialog.component.html',
  styleUrl: './frame-types-dialog.component.css'
})
export class FrameTypesDialogComponent implements OnInit {
  @Output() dialogVisible = new EventEmitter<void>()
  @Input({required: true}) frameTypesDialogVisible: boolean = false;
  @Input({required: true}) frameTypes: FrameType[] = []

  ngOnInit() {
    console.log(this.frameTypes);
  }

  closeFrameTypeDialog() {
    this.dialogVisible.emit();
  }

  getFrameTypeId(frameType: FrameType){
    return Number(frameType.id);
  }
}
