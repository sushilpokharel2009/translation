import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { 
  AppComponent,
  SecondCmpComponent,
  ThirdCmpComponent,
  FourthCmpComponent,
  LiveDataForFourthComponent,
  DataProvider }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, CommonModule ],
  declarations: [
    AppComponent, SecondCmpComponent, 
    ThirdCmpComponent, FourthCmpComponent,
    LiveDataForFourthComponent
  ],
  providers: [DataProvider],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
