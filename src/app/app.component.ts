import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { AddExpression, SubExpression, FooExpression, ComplicatedExpression } from './view-model/expression';
import { AddExpressionComponent } from './components/+expression/+add-expression';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('childContainer', { read: ViewContainerRef }) childContainer: ViewContainerRef;
  // Expose class so that it can be used in the template
  addExpression = AddExpressionComponent;


  // Initial component object
  initialAddExpression = new AddExpression();
  initialSubExpression = new SubExpression();
  initialFooExpression = new FooExpression();
  initialComplicatedExpression = new ComplicatedExpression();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  addComponent(componentClass: Type<any>) {
    // Create component dynamically inside the ng-template with @input and @output
    //   this._cr.resolveComponent(componentClass).then(cmpFactory => {               
    //   let cmpRef = this.childContainer.createComponent(cmpFactory);
    //    cmpRef.instance.dropInExpression = addExpression;  
    //    let instance: any = this.childContainer.createComponent(cmpFactory).instance;
    //     if (!!instance.close) {
    //       // close is eventemitter decorated with @output 
    //       instance.close.subscribe(this.close);
    //     }
    //  });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.childContainer.createComponent(componentFactory);
  }

  removeComponent(componentClass: Type<any>) {
    // Remove component from both view and array
    this.childContainer.remove(0);
    this.childContainer.clear();
  }

  resetDropArea() {
    this.removeComponent(this.addExpression);
    this.droppedIn = false;
    this.expressionOption = '';
  }

  droppedIn: boolean = true;

  expressionOption: string = '';
  onAreaDrop(data: any) {
    if (this.expressionOption == '') {
      this.expressionOption = data;
      this.droppedIn = false;
    }
  }
}
