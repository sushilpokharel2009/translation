import { Component, SecurityContext } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'my-app',
  template: `
  <h1>Sanitize API</h1>
  
  <iframe [src]="iframe" style="width:1000px;height:200px;"></iframe>
  <br>
  <div [innerHtml]="html"></div>
  <br>
  <div [innerHtml]="testHtml"></div>

  `,
})
export class AppComponent {
  iframe: any;
  html: any;
  testHtml: any;
  constructor(private sanitizer: DomSanitizer) {
    // bypassSecurityTrustResourceUrl
    this.iframe = sanitizer.bypassSecurityTrustResourceUrl('https://www.google.co.in');
    // bypassSecurityTrustHtml
    this.html = sanitizer.bypassSecurityTrustHtml('<h3>DomSanitizer - Check console.log</h3><script>ourSafeCode()</script>') ;
    // SecurityContext
    this.testHtml = sanitizer.sanitize(SecurityContext.HTML, '<h1>Sanitize</h1><script>attackerCode()</script>');
  }

  /*
  
  Possible Options for SecurityContext are below

  SecurityContext.NONE
  SecurityContext.HTML
  SecurityContext.STYLE
  SecurityContext.SCRIPT
  SecurityContext.URL
  SecurityContext.RESOURCE_URL
  
  */
  
  /*
  
  Options possible for bypassSecurityTrustHtml

  sanitize(context: SecurityContext, value: any) : string
  bypassSecurityTrustHtml(value: string) : SafeHtml
  bypassSecurityTrustStyle(value: string) : SafeStyle
  bypassSecurityTrustScript(value: string) : SafeScript
  bypassSecurityTrustUrl(value: string) : SafeUrl
  bypassSecurityTrustResourceUrl(value: string) : SafeResourceUrl

  */

 }
