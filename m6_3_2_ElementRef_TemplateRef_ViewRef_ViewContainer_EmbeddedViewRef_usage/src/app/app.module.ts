import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent, toggleElDirective }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, toggleElDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
