import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Talks } from '../../providers/talks';

/*
  Generated class for the Talk page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-talk',
  templateUrl: 'talk.html'
})
export class TalkPage {

  public talk: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private talksService: Talks
  ) {}

  private getParams(): void {
    this.talk = this.navParams.get('talk');
  }

  public toggleFavorite(talk, event): void {
    event.stopPropagation();
    this.talksService.toggleFavorite(talk);
  }


  public isFavorite(talk): boolean {
    return this.talksService.isFavorite(talk);
  }

  ionViewDidLoad() {
    this.getParams();
  }

}
