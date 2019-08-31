import { Component, Input } from '@angular/core';
import { SlideComponent }      from '../../../../interfaces/slide/slide.component';
@Component({
  template: `
    <div class="slide">
    <h3>Slide Template One</h3>
      <h4>{{data.headline}}</h4> 
      {{data.bio}}
    </div>
  `
})
export class SlideOneComponent implements SlideComponent {
  @Input() data: any;
}
