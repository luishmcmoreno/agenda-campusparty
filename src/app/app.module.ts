import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

import { FavoritesPage } from '../pages/favorites/favorites';
import { FiltersPage } from '../pages/filters/filters';
import { TalkPage } from '../pages/talk/talk';
import { TalksPage } from '../pages/talks/talks';
import { TabsPage } from '../pages/tabs/tabs';
import { StageComponent } from '../components/stage/stage';
import { Talks } from '../providers/talks';
import { Filter } from '../providers/filter';
import { Stagename } from '../pipes/stagename';
import { OrderByDate } from '../pipes/order-by-date';
import { FilterTalks } from '../pipes/filter';

@NgModule({
  declarations: [
    MyApp,
    FavoritesPage,
    FiltersPage,
    TalkPage,
    TalksPage,
    Stagename,
    TabsPage,
    StageComponent,
    OrderByDate,
    FilterTalks
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FavoritesPage,
    FiltersPage,
    TalkPage,
    TalksPage,
    TabsPage
  ],
  providers: [
    {
      provide: ErrorHandler, useClass: IonicErrorHandler
    },
    Talks,
    Filter,
    Storage
  ]
})
export class AppModule {}
