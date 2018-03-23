import { H5DraggableDirective } from './h5-draggable.directive';
import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[h5DraggableHelper]',
  exportAs: 'h5DraggableHelper'
})
export class H5DraggableHelperDirective implements OnInit, OnDestroy {
  private overlayRef: OverlayRef;
  private positionStrategy = new GlobalPositionStrategy(document);
  private startPosition?: { x: number; y: number };

  constructor(private h5draggable: H5DraggableDirective,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private overlay: Overlay) { }

  ngOnInit(): void {
    this.h5draggable.dragStart.subscribe(event => this.onDragStart(event));
    this.h5draggable.dragMove.subscribe(event => this.onDragMove(event));
    this.h5draggable.dragEnd.subscribe(() => this.onDragEnd());

    // create an overlay...
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy
    });
  }

  ngOnDestroy(): void {
    // remove the overlay...
    this.overlayRef.dispose();
  }

  private onDragStart(event: PointerEvent): void {
    // determine relative start position
    const clientRect = this.h5draggable.element.nativeElement.getBoundingClientRect();

    this.startPosition = {
      x: event.clientX - clientRect.left,
      y: event.clientY - clientRect.top
    };
  }

  private onDragMove(event: PointerEvent): void {
    if (!this.overlayRef.hasAttached()) {
      // render the helper in the overlay
      this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
    }

    // position the helper...
    this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    this.positionStrategy.apply();
  }

  private onDragEnd(): void {
    console.log('H5DraggableHelperDirective onDragEnd MouseUp');
    // remove the helper from the overlay
    this.overlayRef.detach();
  }
}
