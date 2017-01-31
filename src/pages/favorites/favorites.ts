import { Component } from '@angular/core';
import { NavController, PopoverController, NavParams } from 'ionic-angular';

import { Talks } from '../../providers/talks';
import { Filter } from '../../providers/filter';
import { TalkPage } from '..//talk/talk';
import { FiltersPage } from '../filters/filters';

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
  public filter: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filterService: Filter,
    public popoverCtrl: PopoverController,
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

  private getFilters(): void {
    this.filterService.getFilters().then((filter) => {
      this.filter = filter;
    });
    this.filterService.onFilterChanged().subscribe((filter) => {
      this.filter = filter;
    });
  }

  public numFilters(): number {
    if (!this.filter) {
      return 0;
    }
    return Object.keys(this.filter).length;
  }

  public goToTalk(talk): void {
    this.navCtrl.push(TalkPage, {
      talk: talk
    });
  }

  public openFilters(ev): void {
    let popover = this.popoverCtrl.create(FiltersPage);
    popover.present({
      ev: ev
    });
  }

  public removeFavorite(talk, event): void {
    event.stopPropagation();
    this.talks.toggleFavorite(talk);
  }

  ionViewDidLoad() {
    this.getFavorites();
    this.getFilters();
  }

}
