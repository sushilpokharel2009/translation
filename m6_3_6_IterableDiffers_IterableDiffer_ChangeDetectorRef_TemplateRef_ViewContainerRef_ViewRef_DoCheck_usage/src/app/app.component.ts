import { 
  Component, Directive,
  IterableDiffers, IterableDiffer,
  ChangeDetectorRef, TemplateRef,
  ViewContainerRef, ViewRef,
  DoCheck
} from '@angular/core';

/* 
 * Partial ngFor implementation - works with NGv2.4
*/
@Component({
  selector: 'my-app',
  template: `
  <input type="text" [(ngModel)]="newitem" [ngModelOptions]="{standalone:true}"/>
  <button (click)="addItem(newitem)">Add Item</button>
  <br/>
  <div *fordemo="let item of items">
      {{item}}
  </div>
  `,
})
export class AppComponent  {
  items: any[] = [1, 2, 3];
  newitem: any;
  addItem(newitem: any) {
    this.items.push(newitem);
    this.newitem = null;
  }
 }

@Directive({
  selector: '[fordemo]',
  inputs: ['fordemoOf', 'newitem']
})
export class FordemoDirective implements DoCheck {
  /* 
   * The actual item collection below
   */
  private _collection: any;
  /* 
   * The differ related to the specific collection. Different for different type of collections/items
   */
  private _differ: IterableDiffer;
  /* 
   * viewMap stores a copy in memory for any checks and get details of viewcontainer
   */
  private _viewMap: Map<any, ViewRef> = new Map<any, ViewRef>();
  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: IterableDiffers,
              private _template: TemplateRef<any>,
              private _viewContainer: ViewContainerRef,
              ) {
  }
  /* Sets the _collection with the passed items value */
  set fordemoOf(coll: any) {
    this._collection = coll;
    /* 
     * if coll is not blank and iterableDiffers is then
     * _differ is assigned the appropriate iterablediffers after finding it 
     * this find is based on the type of collection
     */
    if (coll && !this._differ) {
      this._differ = this._differs.find(coll).create(this._changeDetector);
    }
  }
  ngDoCheck() {
    /*
     * If _diff is valid and has been assigned the do further
    */
    if (this._differ) {
      /* 
       * capture any changes using the .diff function of the _differ
       */
      const changes = this._differ.diff(this._collection);
      if (changes) {
        /* 
         * If the changes are valid then: 
         * (changes are based on the values that were checked when the diff was done last time)
         * Assign the change.item implicitly to the view.context
         * (view.context is the context for the _viewContainer's embeddedviewref that is termed view)
         */
        /*
         * The following is run whenever an item change is due to addition of item to the list
        */
        changes.forEachAddedItem((change: any) => {
          const view = this._viewContainer.createEmbeddedView(this._template);
          view.context.$implicit = change.item;
          /* 
           * Keep a copy of the view using _viewMap for next diff
           */
          this._viewMap.set(change.item, view);
        });
        /* 
         * The following is run whenever an item change is due to removal of item from list
         */
        changes.forEachRemovedItem((change: any) => {
          /* 
           * Get the viewMap for checking the DOM for the specific item that changed
           * check the index of the view that needs to be removed
           */
          const view = this._viewMap.get(change.item);
          const viewIndex = this._viewContainer.indexOf(view);
          /* 
           * Remove the iem from the DOM
           */
          this._viewContainer.remove(viewIndex);
          /* 
           * Remove from the DOM
           */
          this._viewMap.delete(change.item);
        });
      }
    }
  }
}
