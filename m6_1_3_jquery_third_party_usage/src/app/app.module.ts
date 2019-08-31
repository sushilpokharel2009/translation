import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';


import {NgChosenComponent} from './app.component';

@NgModule({
    imports:[BrowserModule, FormsModule, CommonModule],
    declarations:[
        NgChosenComponent
    ],
    providers:[],
    bootstrap:[NgChosenComponent]
})
export class AppModule{

}