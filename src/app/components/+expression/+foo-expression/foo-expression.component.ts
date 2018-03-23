import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddExpression, SubExpression, FooExpression, ComplicatedExpression } from './../../../view-model/expression';
import { ComplicateExpressionService } from './../../../services/index';
import { SharedDroppableInputService } from './../+shared-droppable-input/shared-droppable-input.service';

@Component({
  selector: 'foo-expression',
  templateUrl: './foo-expression.component.html'
})
export class FooExpressionComponent implements OnInit {
  private displayExpression: boolean = false;
  @Input() dropInExpression: FooExpression = new FooExpression();
  currentExpression = new FooExpression();

  constructor(private expression$: ComplicateExpressionService, private sharedDropInput$: SharedDroppableInputService) {

  }

  ngOnInit() {
    this.currentExpression = this.dropInExpression;
  }

  onLeftInputExpressionDrop(data: any) {
    this.sharedDropInput$.injectExpressionOnDrop(data, this.currentExpression, 'x');
  }

  onMiddleInputExpressionDrop(data: any) {
    this.sharedDropInput$.injectExpressionOnDrop(data, this.currentExpression, 'y');
  }

  onRightInputExpressionDrop(data: any) {
    this.sharedDropInput$.injectExpressionOnDrop(data, this.currentExpression, 'z');
  }

  public isLeftInputExpression(dropInExpression) {
    return this.currentExpression.expression_x == null ? true : false;
  }

  public isMiddleInputExpression(dropInExpression) {
    return this.currentExpression.expression_y == null ? true : false;
  }

  public isRightInputExpression(dropInExpression) {
    return this.currentExpression.expression_z == null ? true : false;
  }

  get CurrentExpressionFormat() {
    return this.expression$.calculateFooExpressionFormat(this.currentExpression);
  }

  get CurrentExpressionResult() {
    return this.expression$.calculateFooResult(this.currentExpression);
  }

  @Output('parentRecal') parentRecalEmitter = new EventEmitter();

  recallParent() {
    this.parentRecalEmitter.emit({
      updatedNodeSum: this.expression$.foo(this.currentExpression.num_x, this.currentExpression.num_y, this.currentExpression.num_z),
      parentDirection: this.currentExpression.parentDirection
    });
  }

  recalculateParent(event$) {
    this.sharedDropInput$.recalculateParentNode(event$, this.currentExpression);

    this.recallParent();
  }

  leftInputChange(newValue) {
    this.recallParent();
  }

  middleInputChange(newValue) {
    this.recallParent();
  }

  rightInputChange(newValue) {
    this.recallParent();
  }
}