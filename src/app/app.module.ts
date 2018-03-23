import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { H5DndModule } from './directives/h5-dnd.module';
import { ExpressionsModule } from './components/expression.module';

import { AddExpressionComponent } from './components/+expression/index';

import {
  AddExpressionService,
  SubExpressionService,
  ComplicateExpressionService
} from './services/index';

const SERVICE_COMPONENTS = [
  AddExpressionService,
  SubExpressionService
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    H5DndModule,
    ExpressionsModule
  ],
  exports: [
    H5DndModule
  ],
  providers: [...SERVICE_COMPONENTS],
  bootstrap: [AppComponent],
  // entryComponents: [
  //   AddExpressionComponent
  // ]
})
export class AppModule { }
