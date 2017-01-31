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

  private findTalk(stages, talkId): any {
    for (let s in stages) {
      let stage = stages[s];
      for (let t in stage.activities) {
        let talk = stage.activities[t];
        if (talk.id === talkId) {
          return talk;
        }
      }
    }
    return undefined;
  }

  private updateFavorites(stages): void {
    this.getFavorites().subscribe((favorites) => {
      for (let f in favorites) {
        let favorite = favorites[f];
        let updatedFavorite = this.findTalk(stages, favorite.id);
        if (!updatedFavorite) continue;
        favorites[f] = updatedFavorite;
      }
      this.favorites = favorites;
      this.storage.set('favorites', favorites);
    });
  }

  public getTalks(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      if (navigator.onLine) {
        let obs = this.http.get('https://campuse.ro/api/legacy/events/campus-party-brasil-2017/stages').map((res: Response) => res.json());
        obs.subscribe((talks) => {
          talks.forEach((stage) => {
              for (let t = stage.activities.length - 1; t >= 0; t--) {
                let talk = stage.activities[t];
                let talkDate = talk.date.replace(':00+00:00', '');
                let splittedTalk = talkDate.split(' ');
                let date = splittedTalk[0];
                let time = splittedTalk[1];
                let splittedDate = date.split('-');
                let year = splittedDate[0];
                let month = splittedDate[1];
                let day = splittedDate[2];
                let hours = time.split(':')[0];
                let minutes = time.split(':')[1];
                talk.date = new Date(year, month - 1, day, hours, minutes, 0, 0);
                talk.date.setHours(talk.date.getHours() - 2);
                if (Number(talk.id) === 11075 || Number(talk.id) === 10402 || Number(talk.id) === 10959) {
                  stage.activities.splice(t, 1);
                }
              }
          });
          this.updateFavorites(talks);
          this.storage.set('talks', talks);
          observer.next(talks);
          // removing unnecessary talk
        }, (err) => {
          console.error(err);
          this.storage.get('talks').then((talks) => {
            observer.next(talks);
          }, (errStorage) => {
            console.error(errStorage);
            observer.error(errStorage);
          });
        });
      } else {
          this.storage.get('talks').then((talks) => {
            observer.next(talks);
          }, (errStorage) => {
            console.error(errStorage);
            observer.error(errStorage);
          });
      }
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

  public isFavorite(talk): boolean {
    for (let f in this.favorites) {
      let favorite = this.favorites[f];
      if (favorite.id === talk.id) {
        return true;
      }
    }
    return false;
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
