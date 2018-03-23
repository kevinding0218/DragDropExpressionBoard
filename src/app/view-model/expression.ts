
interface ExpressionFormat {
  LogExpressionFormat: () => void;
}

export abstract class BaseSingleExpression implements ExpressionFormat{
  public name: string;
  public operator: string;
  public parentDirection?: string = '';

  constructor (_name: string, _operator: string) {
      this.name = _name;
      this.operator = _operator;
  }
  abstract LogExpressionFormat(): void;
}

export class AddExpression extends BaseSingleExpression {
  public expression_x?: AddExpression = null;
  public num_x: number = 0;
  public expression_y?: AddExpression = null;
  public num_y: number = 0;
  constructor() {
    super('add', '+'); 
  }

  public LogExpressionFormat(): void {
      console.log(`${this.name}([${this.num_x}], [${this.num_y}])`);
  }
}

export class SubExpression extends BaseSingleExpression {
  public expression_x?: SubExpression = null;
  public num_x: number = 0;
  public expression_y?: SubExpression = null;
  public num_y: number = 0;
  constructor() {
    super('substract', '-'); 
  }

  public LogExpressionFormat(): void {
      console.log(`${this.name}([${this.num_x}], [${this.num_y}])`);
  }
}

export class FooExpression extends BaseSingleExpression {
  public expression_x?: FooExpression;
  public num_x: number = 0;
  public expression_y?: FooExpression = null;
  public num_y: number = 0;
  public expression_z?: FooExpression = null;
  public num_z: number = 0;
  constructor() {
      super('foo', '*');
  }

  public LogExpressionFormat(): void {
      console.log(`${this.name}([${this.num_x}], [${this.num_y}], [${this.num_z}])`);
  }
}

export class ComplicatedExpression extends BaseSingleExpression {
  public expression_x?: FooExpression;
  public num_x: number = 0;
  constructor() {
      super('complicated', '^');
  }

  public LogExpressionFormat(): void {
      console.log(`${this.name}([${this.num_x}])`);
  }
}