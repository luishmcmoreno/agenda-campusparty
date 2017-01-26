import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Talks } from '../../providers/talks';
import { TalkPage } from '../talk/talk';

/*
  Generated class for the Favorites page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {

  public favorites: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public talks: Talks
  ) {}

  private getFavorites(): void {
    this.talks.getFavorites().subscribe((favorites) => {
      this.favorites = favorites;
      this.onNewFavorite();
    }, (err) => {
      console.error(err);
    });
  }

  private onNewFavorite(): void {
    this.talks.onNewFavorite().subscribe((favorites) => {
      this.favorites = favorites;
    });
  }

  public goToTalk(talk): void {
    this.navCtrl.push(TalkPage, {
      talk: talk
    });
  }

  public removeFavorite(talk, event): void {
    event.stopPropagation();
    this.talks.toggleFavorite(talk);
  }

  ionViewDidLoad() {
    this.getFavorites();
  }

}
