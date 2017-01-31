import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TalkPage } from '../../pages/talk/talk';
import { Talks } from '../../providers/talks';

/*
  Generated class for the Stage component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'stage',
  templateUrl: 'stage.html'
})
export class StageComponent {

  @Input() stage;
  public icon: string = 'ios-arrow-forward';
  public opened: boolean = false;

  constructor(
    public navCtrl: NavController,
    private talksService: Talks
  ) {}

  public goToTalk(talk): void {
    this.navCtrl.push(TalkPage, {
      talk: talk
    });
  }

  public toggleFavorite(talk, event): void {
    event.stopPropagation();
    this.talksService.toggleFavorite(talk);
  }

  public toggleOpen(): void {
    this.opened = !this.opened;
    if (this.opened) {
      this.icon = 'ios-arrow-down';
    } else {
      this.icon = 'ios-arrow-forward';
    }
  }

  public isFavorite(talk): boolean {
    return this.talksService.isFavorite(talk);
  }

}
