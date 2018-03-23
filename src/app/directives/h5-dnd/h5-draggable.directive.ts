import { Directive, HostBinding, Input, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[h5Draggable]'
})
export class H5DraggableDirective {
  constructor(public element: ElementRef) {
  }

  // here we can control if component should be able to draggable by using an input(out of scope)
  @Input('appDraggable') @HostBinding('draggable') enabled = true;

  // attach movable class
  @HostBinding('class.movable') movable = true;


  @Input()
  set h5Draggable(options: DraggableOptions) {
    if (options) {
      this.options = options;
    }
  }

  private options: DraggableOptions = {};

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    const { data = {} } = this.options;
    event.dataTransfer.setData('Text', JSON.stringify(this.options.data));
  }

  // out of scope, create a different component that will overlay when dragging 
  // emit listerner event with PointerEvent to parent component
  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  private dragging = false;
  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    this.dragging = true;
    event.stopPropagation();
    //console.log('pointerdown pointerEvent:', event);
    this.dragStart.emit(event);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    this.dragMove.emit(event);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    //console.log('pointerup pointerEvent:', event);
    this.dragging = false;
    this.dragEnd.emit(event);
  }
}

export interface DraggableOptions {
  data?: any;
}