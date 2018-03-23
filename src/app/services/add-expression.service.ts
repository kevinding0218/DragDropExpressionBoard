import { Injectable } from '@angular/core';
import { AddExpression } from './../view-model/expression';

@Injectable()
export class AddExpressionService {

  constructor() { }

  add(x: number, y: number): number {
    return Number(x) + Number(y);
  }

  calculateExpressionResult(currentExpression: AddExpression): number {
    return this.add(currentExpression.num_x, currentExpression.num_y);
  }

  // This is recursive calculation on specific expression for sum all only(need to revise later)
  // not recommand since it would be potential over stack.
  calculateInRecursive(currentExpression: AddExpression): number {
    var trackResult: number = 0;

    if (currentExpression.expression_x == null && currentExpression.expression_y == null) {
      trackResult = this.add(Number(currentExpression.num_x), Number(currentExpression.num_y));
    } else if (currentExpression.expression_x != null && currentExpression.expression_y == null) {
      trackResult = this.add(this.calculateExpressionResult(currentExpression.expression_x), Number(currentExpression.num_y));
    } else if (currentExpression.expression_x == null && currentExpression.expression_y != null) {
      trackResult = this.add(Number(currentExpression.num_x), this.calculateExpressionResult(currentExpression.expression_y));
    } else {
      trackResult = this.add(this.calculateExpressionResult(currentExpression.expression_x), this.calculateExpressionResult(currentExpression.expression_y));
    }

    return trackResult;
  }

  calculateExpressionFormat(currentExpression: AddExpression): string {
    //console.log('calculateExpression_recur:', currentExpression);   
    var trackResult: string = '';
    if (currentExpression.expression_x == null && currentExpression.expression_y == null) {
      trackResult = currentExpression.name + '([' + currentExpression.num_x + '], [' + currentExpression.num_y + '])';
    } else if (currentExpression.expression_x != null && currentExpression.expression_y == null) {
      trackResult = currentExpression.name + '([' + this.calculateExpressionFormat(currentExpression.expression_x) + '], [' + currentExpression.num_y + '])';
    } else if (currentExpression.expression_x == null && currentExpression.expression_y != null) {
      trackResult = currentExpression.name + '([' + currentExpression.num_x + '], [' + this.calculateExpressionFormat(currentExpression.expression_y);
    } else {
      trackResult = currentExpression.name + '([' + this.calculateExpressionFormat(currentExpression.expression_x) + '], [' + this.calculateExpressionFormat(currentExpression.expression_y) + '])';
    }

    return trackResult;
  }
}