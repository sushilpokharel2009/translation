import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate';
@Component({
    selector: 'my-app',
    template:`
    <div>
    <h2>{{'HOME.TITLE' | translate}}</h2>
    <select #langSelect  (change)="translate.use(langSelect.value)">
        <option *ngFor="let lang of translate.getLangs()" [value]="lang" [selected]="lang === translate.currentLang">
            {{lang}}
        </option>
    </select>
    
    </div>
    
    `
})
export class AppComponent implements OnInit {
    constructor(private translate: TranslateService) { 
        translate.addLangs(['en','fr']);
        translate.setDefaultLang('en');
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang:'en');
    }

    ngOnInit() { }
}