import { Component, Directive, Input, ElementRef, TemplateRef, ViewRef, ViewContainerRef, EmbeddedViewRef } from '@angular/core';

@Directive({ selector: '[toggleEl]' })
export class toggleElDirective {
  private viewRef: ViewRef;
  private embeddedRef: EmbeddedViewRef<any>;
  constructor(
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
    ) {
      // Dont forget to check the outputs of the following in console
      console.log('ElementRef: ', this.elementRef.nativeElement);
      console.log('TemplateRef: ', this.templateRef);
      console.log('ViewContainerRef: ', this.viewContainer);
     }

  @Input() set toggleEl(shouldAdd: boolean) {
    if (shouldAdd) {
      // If condition is true add template to DOM
      this.embeddedRef = this.viewContainer.createEmbeddedView(this.templateRef);
      this.viewRef = this.viewContainer.get(0);
      // Curently both are same
      console.log('ViewRef: ', this.viewRef);
      console.log('EmbeddedViewRef: ', this.embeddedRef);
    } else {
     // Else remove template from DOM
      this.viewContainer.clear();
    }
  }
}

@Component({
  selector: 'my-app',
  template: `
  <h1>Structural Directive Example</h1>
  <h3>Simple toggleEl Directive</h3>
  <div *toggleEl="toggleElVariable">
      <span>Inside toggleEl Directive</span>
  </div>
  <button (click)="onClicktoggleEl()">Add / Remove El Directive Content Manually</button>
  <br>
  `,
})
export class AppComponent  { 
  toggleElVariable: boolean = true;
  constructor(){}
  onClicktoggleEl(){
    this.toggleElVariable = !this.toggleElVariable;
  }
 }
