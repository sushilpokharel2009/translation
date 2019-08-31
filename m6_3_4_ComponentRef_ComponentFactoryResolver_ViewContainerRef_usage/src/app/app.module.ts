import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { AppComponent }         from '../app/components/app/app.component';
import { SlideHolderComponent }   from '../app/components/slide-holder/slide-holder.component';
import { SlideOneComponent }    from '../app/components/slides/slide-templ/one/slide-one.component';
import { SlideTwoComponent } from '../app/components/slides/slide-templ/two/slide-two.component';
import { SlidePlaceholderDirective } from './directives/slide-placeholder.directive';
import { SlideService }            from '../app/service/slides.service';

/* Referenced from Angular.io demo plus feature additions */

@NgModule({
  imports: [ BrowserModule ],
  providers: [SlideService],
  declarations: [ AppComponent,
                  SlideHolderComponent,
                  SlideOneComponent,
                  SlideTwoComponent,
                  SlidePlaceholderDirective ],
  entryComponents: [ SlideOneComponent, SlideTwoComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {}
}