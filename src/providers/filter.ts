import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, Observer } from 'rxjs';

import 'rxjs/add/operator/map';

/*
  Generated class for the Filter provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Filter {

  private filterChangedObserver: Observer<any>;
  private filterChangedObservable: Observable<any>;

  constructor(
    public storage: Storage
  ) { }


  public onFilterChanged(): Observable<any> {
    if (this.filterChangedObservable) {
      return this.filterChangedObservable;
    } else {
      this.filterChangedObservable = new Observable((observer: Observer<any>) => {
        this.filterChangedObserver = observer;
      });
      return this.filterChangedObservable;
    }
  }

  public getFilters(): Promise<any> {
    return this.storage.get('filters');
  }

  public clear(): void {
      this.storage.remove('filters');
      this.filterChangedObserver.next({});
  }

  public setFilter(filterName, filterValue) {
    this.getFilters().then((filters) => {
      if (!filters) {
        filters = {};
      }
      filters[filterName] = filterValue;
      this.storage.set('filters', filters);
      this.filterChangedObserver.next(filters);
    });
  } 

}
