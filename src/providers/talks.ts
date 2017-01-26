import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Observer } from 'rxjs';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Talks provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Talks {

  private favorites: any[];
  private newFavoriteObserver: Observer<any>;
  private newFavoriteObservable: Observable<any>;

  constructor(public http: Http, public storage: Storage) {
  }

  public getTalks(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      let obs = this.http.get('http://campuse.ro/api/legacy/events/campus-party-brasil-2017/schedule').map((res: Response) => res.json());
      obs.subscribe((talks) => {
        this.storage.set('talks', talks);
        observer.next(talks);
      }, (err) => {
        console.error(err);
        this.storage.get('talks').then((talks) => {
          observer.next(talks);
        }, (errStorage) => {
          console.error(errStorage);
          observer.error(err);
        });
      });
    });
  }

  public getFavorites(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      if (!this.favorites) {
        this.storage.get('favorites').then((favorites) => {
          if (favorites) {
            this.favorites = favorites;
            observer.next(favorites);
          } else {
            this.favorites = [];
            observer.next(this.favorites);
          }
        }).catch((err) => {
          console.error(err);
          observer.error(err);
        });
      } else {
        observer.next(this.favorites);
      }
    });
  }

  public onNewFavorite(): Observable<any> {
    if (this.newFavoriteObservable) {
      return this.newFavoriteObservable;
    } else {

    }
    this.newFavoriteObservable = new Observable((observer: Observer<any>) => {
      this.newFavoriteObserver = observer;
    });
    return this.newFavoriteObservable;
  }

  public toggleFavorite(talk): void {
    this.getFavorites().subscribe((favorites) => {
      for (let f in favorites) {
        let favorite = favorites[f];
        if (favorite.id === talk.id) {
          favorites.splice(f, 1);
          this.storage.set('favorites', favorites);
          this.favorites = favorites;
          if (this.newFavoriteObserver) {
            this.newFavoriteObserver.next(this.favorites);
          }
          return;
        }
      }
      favorites.push(talk);
      this.favorites = favorites;
      this.storage.set('favorites', favorites);
      if (this.newFavoriteObserver) {
        this.newFavoriteObserver.next(this.favorites);
      }
    });
  }

}
