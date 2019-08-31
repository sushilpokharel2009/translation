import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TRANSLATION_PROVIDERS }   from './translate/translations';
import { TranslatePipe }   from './translate/pipes/translate.pipe';
import { TranslateService }   from './translate/services/translate.service';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, TranslatePipe ],
  providers:    [ TRANSLATION_PROVIDERS, TranslateService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
