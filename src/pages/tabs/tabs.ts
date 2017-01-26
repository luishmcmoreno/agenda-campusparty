import { Component } from '@angular/core';

import { TalksPage } from '../talks/talks';
import { FavoritesPage } from '../favorites/favorites';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TalksPage;
  tab2Root: any = FavoritesPage;

  constructor() {

  }
}
