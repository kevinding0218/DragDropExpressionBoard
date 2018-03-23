import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { H5DndModule } from '../directives/h5-dnd.module';

import {
  AddExpressionComponent,
  SubstractExpressionComponent,
  ComplicateExpressionComponent,
  FooExpressionComponent,
  // SharedDroppableInputXComponent
} from './+expression';

const EXPRESSION_COMPONENTS = [
  AddExpressionComponent,
  SubstractExpressionComponent,
  ComplicateExpressionComponent,
  FooExpressionComponent,
  // SharedDroppableInputXComponent
]

import {
  SharedDroppableInputService,
} from './+expression/+shared-droppable-input/shared-droppable-input.service';

import {
  AddExpressionService,
  SubExpressionService,
  ComplicateExpressionService
} from './../services/index';

const SERVICE_COMPONENTS = [
  AddExpressionService,
  SubExpressionService,
  ComplicateExpressionService,
  SharedDroppableInputService
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    H5DndModule
  ],
  declarations: [
    ...EXPRESSION_COMPONENTS,
  ],
  exports: [
    ...EXPRESSION_COMPONENTS
  ],
  providers: [ 
    ...SERVICE_COMPONENTS   
  ]
})
export class ExpressionsModule { }