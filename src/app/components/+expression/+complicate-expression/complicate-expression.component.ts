import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddExpression, SubExpression, FooExpression, ComplicatedExpression } from './../../../view-model/expression';
import { ComplicateExpressionService } from './../../../services/index';
import { SharedDroppableInputService } from './../+shared-droppable-input/shared-droppable-input.service';

@Component({
  selector: 'complicate-expression',
  templateUrl: './complicate-expression.component.html'
})
export class ComplicateExpressionComponent implements OnInit {
  private displayExpression: boolean = false;
  @Input() dropInExpression: ComplicatedExpression = new ComplicatedExpression();
  currentExpression = new ComplicatedExpression();

  constructor(private expression$: ComplicateExpressionService, private sharedDropInput$: SharedDroppableInputService) {

  }

  ngOnInit() {
    this.currentExpression = this.dropInExpression;
  }

  onInputExpressionDrop(data: any) {
    this.sharedDropInput$.injectExpressionOnDrop(data, this.currentExpression, 'x');
  }

  public isInputExpression(dropInExpression) {
    return this.currentExpression.expression_x == null ? true : false;
  }

  get CurrentExpressionFormat() {
    return this.expression$.calculateComplicatedExpressionFormat(this.currentExpression);
  }

  get CurrentExpressionResult() {
    return this.expression$.calculateComplicatedResult(this.currentExpression);
  }

  @Output('parentRecal') parentRecalEmitter = new EventEmitter();
  recallParent() {
    this.parentRecalEmitter.emit({
      updatedNodeSum: this.expression$.complicate(this.currentExpression.num_x),
      parentDirection: this.currentExpression.parentDirection
    });
  }
  recalculateParent(event$) {
    this.sharedDropInput$.recalculateParentNode(event$, this.currentExpression);

    this.recallParent();
  }

  InputChange(newValue) {
    this.recallParent();
  }
}