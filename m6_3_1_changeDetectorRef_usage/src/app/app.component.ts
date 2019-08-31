import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Injectable, OnInit} from '@angular/core'
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

/*
  ChangeDetectorRef.markForCheck() usage
*/

@Component({
  selector: 'second-cmp',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `Number of ticks: {{numberOfTicks}}`
})
export class SecondCmpComponent {
  numberOfTicks = 0;
 
  constructor(private _ref: ChangeDetectorRef) {
    setInterval(() => {
      this.numberOfTicks ++;
      // the following is required, otherwise the view will not be updated
      this._ref.markForCheck();
    }, 1000);
  }
}

@Injectable()
export class DataProvider {
  data: number[] = [1, 2, 3, 4, 5];
  constructor(){}
  getdata() {
    return this.data;
  }
  setData() {
    this.data.push((this.data.length + 1));
  }
  setLiveData() {
    setInterval(() => {
      this.data.push((this.data.length * 2));
    }, 3000);
  }
}

/*
  ChangeDetectorRef.detach() usage
*/

@Component({
  selector: 'third-cmp',
  template: `
  <ul>
    <li *ngFor="let d of data">Data {{d}}</li>
  </ul>
  `
})
export class ThirdCmpComponent {
  data: number[];
  constructor(private _ref: ChangeDetectorRef, private dataProvider: DataProvider) {
    this.data = this.dataProvider.data;
    console.log(this.dataProvider.data);
    this._ref.detach();
    setInterval(() => {
      this.dataProvider.setData();
      this._ref.detectChanges();
    }, 5000);
  }
}

/*
  ChangeDetectorRef.reattach() usage
  ChangeDetectorRef.detach() usage
*/
@Component({
  selector: 'live-data-for-fourth',
  inputs: ['live'],
  template: `
  Data: {{dataProvider.data}}
  `
})
export class LiveDataForFourthComponent {
  live: any;
  constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {}
 
  setLive(value: any) {
    if (value) {
      this.ref.reattach();
    } else {
      this.ref.detach();
    }
  }
}
 
@Component({
  selector: 'fourth-cmp',
  template: `
    <live-data-for-fourth [live]="live"></live-data-for-fourth><br/>
    Close window soon since this is a infinite loop<br/>
    <button type="button" (click)="startLiveData()">Start Live Data Ticking</button>
  `
})
export class FourthCmpComponent {
  live = false;
  constructor(private dataProvider: DataProvider) {}
  startLiveData() {
    this.dataProvider.setLiveData();
  }
}

/*
  ChangeDetectorRef.markForCheck() usage
*/
@Component({
  selector: 'my-app',
  template: `
  Loading Message: {{loadingMessage}}
  <br><br>
  Second Component<br>
  <second-cmp></second-cmp>
  <br><br>
  Fourth Component<br>
  <fourth-cmp></fourth-cmp>
  <br><br>
  Third Component<br>
  <third-cmp></third-cmp>

  `,

  // "Default" will notice the change in `loadingMessage`
  // changeDetection: ChangeDetectionStrategy.Default

  // using OnPush will not detect
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  private loadingMessage = 'Wait for change';
  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Pretend we're loading data from a service.
    // This component is only interested in the call's success
    Observable.of(true)
      .delay(2000)
      .subscribe(success => {
        if(success){
          console.log('Success!');
          this.loadingMessage = 'Success!';
          this._cdr.markForCheck();
        }
      });
  }
}