import { Injectable } from '@angular/core';
import { AddExpression, SubExpression, FooExpression, ComplicatedExpression } from './../../../view-model/expression';

@Injectable()
export class SharedDroppableInputService {

  constructor() { }

  injectExpressionOnDrop(data: any, currentExpression: any, position: string) {
    //console.log(`onLeftInputExpressionDrop: ${data}`);
    var nestedDropInExpression = null;
    switch (data) {
      case 'add': {
        nestedDropInExpression = new AddExpression();
        break;
      }
      case 'substract': {
        nestedDropInExpression = new SubExpression();
        break;
      }
      case 'foo': {
        nestedDropInExpression = new FooExpression();
        break;
      }
      case 'complicated': {
        nestedDropInExpression = new ComplicatedExpression();
        break;
      }
    }

    nestedDropInExpression.parentDirection = position;

    if (position == 'x' && currentExpression.expression_x == null) {
      // if (currentExpression.expression_x == null) {
      currentExpression.expression_x = nestedDropInExpression;
      currentExpression.num_x = 0;
      // }
    } else if (position == 'y' && currentExpression.expression_y == null) {
      currentExpression.expression_y = nestedDropInExpression;
      currentExpression.num_y = 0;
    } else if (position == 'z' && currentExpression.expression_z == null) {
      currentExpression.expression_z = nestedDropInExpression;
      currentExpression.num_z = 0;
    }
  }

  recalculateParentNode(event$, currentExpression: any) {
    if (event$.parentDirection == 'x') {
      currentExpression.num_x = event$.updatedNodeSum;
      console.log('update current num_x to', event$.updatedNodeSum);
    }
    else if (event$.parentDirection == 'y') {
      currentExpression.num_y = event$.updatedNodeSum;
      console.log('update current num_y to', event$.updatedNodeSum);
    }
    else if (event$.parentDirection == 'z') {
      currentExpression.num_z = event$.updatedNodeSum;
      console.log('update current num_z to', event$.updatedNodeSum);
    }
  }
}