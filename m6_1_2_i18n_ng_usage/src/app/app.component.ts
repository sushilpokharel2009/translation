import { Component, OnInit } from '@angular/core';
import { TranslateService } from './translate/services/translate.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
})
export class AppComponent implements OnInit {
    public langs: any[];
    public translatedText: string;
    public supportedLanguages: any[];
  
    constructor(private _translate: TranslateService) { }

    ngOnInit() {
      // standing data
      this.langs = [
        { display: 'English', value: 'en' },
        { display: 'Español', value: 'es' },
        { display: '华语', value: 'zh' },
      ];

      this.selectLang('es');

    }

    isCurrentLang(lang: string) {
      return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
      // set default language;
      this._translate.use(lang);
      this.refreshText();
    }
    refreshText() {
      this.translatedText = this._translate.instant('hello world');
    }
}