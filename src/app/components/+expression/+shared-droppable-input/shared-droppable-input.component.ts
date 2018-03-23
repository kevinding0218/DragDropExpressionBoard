import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-droppable-input-x',
  template: `
    <ng-container *ngIf="isLeftInputExpression(dropInExpression); else leftNestedExpression">
      <input type="text" class="form-control" style="width: 60px;display: inline-block;" maxlength="4" size="4" [(ngModel)]="currentExpression.num_x"
      (ngModelChange)="leftInputChange($event)">
    </ng-container>
    <ng-template #leftNestedExpression>
      <div [ngSwitch]="this.currentExpression.expression_x.name">
          <div *ngSwitchCase="'add'">
              <add-expression [dropInExpression]="this.currentExpression.expression_x" (parentRecal)="recallParent($event)"></add-expression>
          </div>
          <div *ngSwitchCase="'substract'">
              <substract-expression [dropInExpression]="this.currentExpression.expression_x" (parentRecal)="recallParent($event)"></substract-expression>
          </div>
          <div *ngSwitchCase="'foo'">
              <foo-expression [dropInExpression]="this.currentExpression.expression_x" (parentRecal)="recallParent($event)"></foo-expression>
          </div>
          <div *ngSwitchCase="'complicated'">
              <complicate-expression [dropInExpression]="this.currentExpression.expression_x" (parentRecal)="recallParent($event)"></complicate-expression>
          </div>
      </div>
    </ng-template>
  `
})
export class SharedDroppableInputXComponent implements OnInit {
  @Input() dropInExpression: any;
  @Input() currentExpression: any;

  constructor() { }

  ngOnInit() {
  }

  public isLeftInputExpression(dropInExpression) {
    return this.currentExpression.expression_x == null ? true : false;
  }

  @Output() leftInputChangeEmitter = new EventEmitter();
  leftInputChange(newValue) {
    this.leftInputChangeEmitter.emit({
      newValue
    });
  }

  @Output('parentRecal') parentRecalEmitter = new EventEmitter();
  recallParent() {
    this.parentRecalEmitter.emit({ });
  }
}