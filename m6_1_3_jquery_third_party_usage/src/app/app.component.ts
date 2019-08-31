import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
declare var $: any

@Component({
    selector: 'ng-chosen',
    template: `<select #selectElem>
        <option *ngFor="let item of items" [value]="item" [selected]="item === selectedValue">{{item}} option</option>
        </select>
        <h4> {{selectedValue}}</h4>`
})
export class NgChosenComponent implements AfterViewInit {
    @ViewChild('selectElem') el:ElementRef;
    items: any = ['First', 'Second', 'Third'];
    selectedValue: string = 'Second';

    ngAfterViewInit() {
        $(this.el.nativeElement)
            .chosen()
            .on('change', (e: any, args: any) => {
                this.selectedValue = args.selected;
            });
    }
}
