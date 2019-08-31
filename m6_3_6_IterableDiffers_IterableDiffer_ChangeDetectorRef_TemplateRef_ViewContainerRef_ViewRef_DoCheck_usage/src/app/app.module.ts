import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { AppComponent, FordemoDirective }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, CommonModule ],
  declarations: [ AppComponent, FordemoDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
