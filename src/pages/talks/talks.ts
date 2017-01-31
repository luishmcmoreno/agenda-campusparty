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

  public stages: any[];
  public favorites: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public talksService: Talks
  ) {}

  private getTalks(): void {
    let loading = this.loadingCtrl.create({
      content: 'Carregando palestras...'
    });
    loading.present();
    this.talksService.getTalks().subscribe((stages) => {
      this.stages = stages;
      loading.dismiss();
    }, () => {
      loading.dismiss();
    });
  }

  ionViewDidLoad() {
    this.getTalks();
  }

}
