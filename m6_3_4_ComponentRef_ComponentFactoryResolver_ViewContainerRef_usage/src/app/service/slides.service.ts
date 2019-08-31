import { Injectable }           from '@angular/core';
import { SlideOneComponent }   from '../components/slides/slide-templ/one/slide-one.component';
import { SlideTwoComponent } from '../components/slides/slide-templ/two/slide-two.component';
import { SlideTemplate }               from '../interfaces/slideref/slide.itemref.interface';
@Injectable()
export class SlideService {

  constructor() {}
  getSlides() {
    return [
      new SlideTemplate(SlideOneComponent, {name: 'Edureka', bio: 'Angular Training Use cases'}),
      new SlideTemplate(SlideOneComponent, {name: 'Angular.io\' Demo', bio: 'Scalable'}),
      new SlideTemplate(SlideTwoComponent,   {name: 'ComponentRef and ViewContainer',
                                        bio: 'Creation and usage strategies!'}),
      new SlideTemplate(SlideTwoComponent,   {name: 'Zone.run() example',
                                        bio: 'Exceptional use cases'}),
    ];
  }
}
