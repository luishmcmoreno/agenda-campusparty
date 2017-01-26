import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { Talks } from '../../providers/talks';

/*
  Generated class for the Talks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-talks',
  templateUrl: 'talks.html'
})
export class TalksPage {

  public talks: any[];
  public favorites: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public talksService: Talks
  ) {}

  private getTalks(): void {
    this.talksService.getTalks().subscribe((talks) => {
      this.talks = talks;
      console.log(talks);
    });
  }


  private getFavorites(): void {
    let loader = this.loadingCtrl.create({
      content: 'Buscando palestras...'
    });
    loader.present();
    this.talksService.getFavorites().subscribe((favorites) => {
      this.favorites = favorites;
      this.onNewFavorite();
      loader.dismiss();
    }, (err) => {
      loader.dismiss();
      console.error(err);
    });
  }
  private onNewFavorite(): void {
    this.talksService.onNewFavorite().subscribe((favorites) => {
      this.favorites = favorites;
    });
  }

  public toggleFavorite(talk): void {
    this.talksService.toggleFavorite(talk);
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

  ionViewDidLoad() {
    this.getTalks();
    this.getFavorites();
  }

}
