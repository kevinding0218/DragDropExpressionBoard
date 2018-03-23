import { Injectable } from '@angular/core';
import { SubExpression } from './../view-model/expression';
import { AddExpressionService } from './add-expression.service';

@Injectable()
export class SubExpressionService {

  constructor(private _addService: AddExpressionService) { }

  substract(x: number, y: number): number {
    return Number(x) - Number(y);
  }

  calculateExpressionResult(currentExpression: SubExpression): number { 
    return this.substract(currentExpression.num_x, currentExpression.num_y);
  }

  // This is recursive calculation on specific expression for sub all only(need to revise later)
  // not recommand since it would be potential over stack.
  calculateInRecursive(currentExpression: SubExpression): number {   
    var trackResult: number = 0;

    if (currentExpression.expression_x == null && currentExpression.expression_y == null) {
      trackResult = this.substract(Number(currentExpression.num_x), Number(currentExpression.num_y));
    } else if (currentExpression.expression_x != null && currentExpression.expression_y == null) {
      if (currentExpression.expression_x.name == 'add') {
        trackResult = this.substract(this._addService.calculateInRecursive(currentExpression.expression_x), Number(currentExpression.num_y));
      } else 
        trackResult = this.substract(this.calculateExpressionResult(currentExpression.expression_x), Number(currentExpression.num_y));
    } else if (currentExpression.expression_x == null && currentExpression.expression_y != null) {
      trackResult = this.substract(Number(currentExpression.num_x), this.calculateExpressionResult(currentExpression.expression_y));
    } else {
      trackResult = this.substract(this.calculateExpressionResult(currentExpression.expression_x), this.calculateExpressionResult(currentExpression.expression_y));
    }

    return trackResult;
  }

  calculateExpressionFormat(currentExpression: SubExpression): string { 
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