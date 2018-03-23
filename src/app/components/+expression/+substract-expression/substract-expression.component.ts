import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddExpression, SubExpression, FooExpression, ComplicatedExpression } from './../../../view-model/expression';
import { SubExpressionService } from './../../../services/index';
import { SharedDroppableInputService } from './../+shared-droppable-input/shared-droppable-input.service';

@Component({
  selector: 'substract-expression',
  templateUrl: 'substract-expression.component.html'
})
export class SubstractExpressionComponent implements OnInit {
  private displayExpression: boolean = false;
  @Input() dropInExpression: SubExpression = new SubExpression();
  currentExpression = new SubExpression();

  constructor(private expression$: SubExpressionService, private sharedDropInput$: SharedDroppableInputService) {

  }

  ngOnInit() {
    this.currentExpression = this.dropInExpression;
  }

  onLeftInputExpressionDrop(data: any) {
    this.sharedDropInput$.injectExpressionOnDrop(data, this.currentExpression, 'x');
  }

  onRightInputExpressionDrop(data: any) {
    this.sharedDropInput$.injectExpressionOnDrop(data, this.currentExpression, 'y');
  }

  public isLeftInputExpression(dropInExpression) {
    return this.currentExpression.expression_x == null ? true : false;
  }

  public isRightInputExpression(dropInExpression) {
    return this.currentExpression.expression_y == null ? true : false;
  }

  get CurrentExpressionFormat() {
    return this.expression$.calculateExpressionFormat(this.currentExpression);
  }

  get CurrentExpressionResult() {
    return this.expression$.calculateExpressionResult(this.currentExpression);
  }

  @Output('parentRecal') parentRecalEmitter = new EventEmitter();

  recallParent() {
    this.parentRecalEmitter.emit({
      updatedNodeSum: this.expression$.substract(this.currentExpression.num_x, this.currentExpression.num_y),
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

  rightInputChange(newValue) {
    this.recallParent();
  }
}