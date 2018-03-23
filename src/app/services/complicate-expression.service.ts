import { Injectable } from '@angular/core';
import { FooExpression, ComplicatedExpression } from './../view-model/expression';

@Injectable()
export class ComplicateExpressionService {

  constructor() { }

  foo(x: number, y: number, z: number): number {
    return Number(x) * Number(y) * Number(z);
  }

  complicate(x: number) {
    return Math.round(2 * Math.PI * Number(x));
  }

  calculateFooResult(currentExpression: FooExpression): number {
    return this.foo(currentExpression.num_x, currentExpression.num_y, currentExpression.num_z);
  }

  calculateFooExpressionFormat(currentExpression: FooExpression): string {
    return currentExpression.name + '([' + currentExpression.num_x + '], [' + currentExpression.num_y + '], [' + currentExpression.num_z + '])';;
  }

  calculateComplicatedResult(currentExpression: ComplicatedExpression): number {
    return this.complicate(currentExpression.num_x);
  }

  calculateComplicatedExpressionFormat(currentExpression: ComplicatedExpression): string {
    var trackResult: string = '';

    if (currentExpression.expression_x == null) {
      trackResult = currentExpression.name + '([' + currentExpression.num_x + '])';
    } else {
      trackResult = currentExpression.name + '([' + this.calculateComplicatedExpressionFormat(currentExpression.expression_x) + '])';
    }

    return trackResult;
  }


}