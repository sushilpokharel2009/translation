import { Component, Input, NgZone }  from '@angular/core';
import { SlideComponent }       from '../../../../interfaces/slide/slide.component';

@Component({
  template: `
    <div class="slide">
      <h3>Slide Template Two</h3>
      <h4>{{data.name}}</h4>
      <p>{{data.bio}}</p>
      <strong>My Slide Template Two details</strong>

    </div>
  `
})
export class SlideTwoComponent implements SlideComponent {
  @Input() data: any;

  constructor(private _zone: NgZone) {

  }
  // Incase you want to run the manual change detection
  ngAfterViewInit() : void {
    this._zone.run(() => {
    
    });
  }
}
