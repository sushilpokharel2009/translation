import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[slide-placeholder]',
})
export class SlidePlaceholderDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
    
   }
}
