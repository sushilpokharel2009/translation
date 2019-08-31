import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';

import { SlidePlaceholderDirective }      from '../../directives/slide-placeholder.directive';
import { SlideTemplate } from '../../interfaces/slideref/slide.itemref.interface';
import {SlideService} from '../../service/slides.service';
@Component({
  selector: 'slide-holder',
  template: `
              <div class="slide">
                <h3>Slide Decks similar to Ad Banners</h3>
                <template slide-placeholder></template>
                <div style="position: absolute; top: 360px; left: 160px;">
                  <button (click)="onPreviousClick()"> <<< </button>
                  <button (click)="onNextClick()"> >>> </button>
                </div>
                
              </div>
            `,
    styles:[`
        .slide{
          width: 400px;
          height: 400px;
          border: 1px solid #eee;
          border-radius: 5px;
          text-align: center;
        }
      `]
})
export class SlideHolderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() slides: SlideTemplate[];
  currentAddIndex: number = -1;
  @ViewChild(SlidePlaceholderDirective) slidePlaceholder: SlidePlaceholderDirective;
  subscription: any;
  interval: any;
  constructor(private _componentFactoryResolver: ComponentFactoryResolver, private _slideService: SlideService ) { 
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.loadComponent();
    this.getSlides();
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  loadPreviousComponent(arg: number){
    this.currentAddIndex = (this.currentAddIndex + arg) % this.slides.length;
    this.changeSlide();
  }
  loadComponent() {
    this.currentAddIndex = (this.currentAddIndex + 1) % this.slides.length;
    this.changeSlide();
  }
  changeSlide(){
    let slideItem = this.slides[this.currentAddIndex];
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(slideItem.component);
    let viewContainerRef = this.slidePlaceholder.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<SlideTemplate>componentRef.instance).data = slideItem.data;
  }
  onPreviousClick() {
    this.loadPreviousComponent(-1);
  }
  onNextClick() {
    this.loadComponent();
  }
  getSlides() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 10000);
  }
}
