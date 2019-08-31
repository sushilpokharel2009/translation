import { Component, OnInit, NgZone } from '@angular/core';
import { SlideService }         from '../../service/slides.service';
import { SlideTemplate }            from '../../interfaces/slideref/slide.itemref.interface';

/* Referenced from Angular.io demo plus feature additions */

@Component({
  selector: 'my-app',
  template: `
    <div>
      <slide-holder [slides]="slides"></slide-holder>
    </div>
  `
})
export class AppComponent implements OnInit {
  slides: SlideTemplate[];
  constructor(private slideService: SlideService, private _zone: NgZone) {}
  ngOnInit() {
    this.slides = this.slideService.getSlides();
  }
  // Incase you want to run the manual change detection
  ngAfterViewInit() : void {
    this._zone.run(() => {
    
    });
  }
}
