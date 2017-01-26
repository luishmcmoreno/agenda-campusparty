import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  private getParams(): void {
    this.talk = this.navParams.get('talk');
    console.log(this.talk);
  }

  ionViewDidLoad() {
    this.getParams();
  }

}
