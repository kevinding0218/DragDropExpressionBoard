import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { H5DropTargetDirective } from './h5-dnd/h5-drop-target.directive';
import { H5DraggableDirective } from './h5-dnd/h5-draggable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [H5DraggableDirective, H5DropTargetDirective],
  exports: [H5DraggableDirective, H5DropTargetDirective],
  providers: []
})
export class H5DndModule { }