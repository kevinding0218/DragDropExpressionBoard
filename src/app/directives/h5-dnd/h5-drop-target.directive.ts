import { Directive, HostBinding, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[h5DropTarget]'
})
export class H5DropTargetDirective {
  constructor() {
  }

  // inform parent if drop is completed
  @Output('dropEmiiter') dropEmiiter = new EventEmitter();

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    const data =  JSON.parse(event.dataTransfer.getData('Text'));

    this.dropEmiiter.emit(data);
  }
}