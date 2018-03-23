import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddExpression, SubExpression, FooExpression, ComplicatedExpression } from './../../../view-model/expression';
import { AddExpressionService } from './../../../services/index';
import { SharedDroppableInputService } from './../+shared-droppable-input/shared-droppable-input.service';

@Component({
  selector: 'add-expression',
  templateUrl: 'add-expression.component.html'
})
export class AddExpressionComponent implements OnInit {
  // flag to display express format
  private displayExpression: boolean = false;
  // input for next drop=in add expression node
  @Input() dropInExpression: AddExpression = new AddExpression();
  // current expression node
  currentExpression = new AddExpression();

  constructor(private expression$: AddExpressionService, private sharedDropInput$: SharedDroppableInputService) {

  }

  ngOnInit() {
    this.currentExpression = this.dropInExpression;
  }

  // initial dropped expression
  onLeftInputExpressionDrop(data: any) {
    this.sharedDropInput$.injectExpressionOnDrop(data, this.currentExpression, 'x');
  }

  onRightInputExpressionDrop(data: any) {
    this.sharedDropInput$.injectExpressionOnDrop(data, this.currentExpression, 'y');
  }

  // check if input x area was dropped by other component
  public isLeftInputExpression(dropInExpression) {
    return this.currentExpression.expression_x == null ? true : false;
  }

  public isRightInputExpression(dropInExpression) {
    return this.currentExpression.expression_y == null ? true : false;
  }

  // get current expression's format
  get CurrentExpressionFormat() {
    return this.expression$.calculateExpressionFormat(this.currentExpression);
  }

  // get current expression's result
  get CurrentExpressionResult() {
    return this.expression$.calculateExpressionResult(this.currentExpression);
  }

  // inform parent expression when value changes
  @Output('parentRecal') parentRecalEmitter = new EventEmitter();
  
  recallParent() {
    this.parentRecalEmitter.emit({
      updatedNodeSum: this.expression$.add(this.currentExpression.num_x, this.currentExpression.num_y),
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