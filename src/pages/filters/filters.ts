import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Talks } from '../../providers/talks';
import { Filter } from '../../providers/filter';

/*
  Generated class for the Filters page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html'
})
export class FiltersPage {

  public stages: any;
  public iondate: any;
  public stage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filtersService: Filter,
    public loadingCtrl: LoadingController,
    private talks: Talks
  ) {}

  private getFilters(): void {
    this.filtersService.getFilters().then((filters) => {
      for (let filter in filters) {
        switch (filter) {
          case 'date':
            this.iondate = filters[filter];
            break;
          case 'stage':
            this.stage = filters[filter];
            break;
        }
      }
    });
  }

  public getStages(): void {
    this.stages = [{"name":"Campuseiro Curador I CPBR10","slug":"Campuseiro-Curador-I-CPBR10"},{"name":"Campuseiro Curador II CPBR10","slug":"Campuseiro-Curador-II-CPBR10"},{"name":"Espaço Fazedores CPBR10","slug":"espaco-fazedores-cpbr10"},{"name":"Palco Ciência CPBR10","slug":"Palco-Ciencia-CPBR10"},{"name":"Palco Corporate CPBR10","slug":"Palco-Corporate-CPBR10"},{"name":"Palco Criatividade: Design CPBR10","slug":"Palco-Criatividade-Design-CPBR10"},{"name":"Palco Criatividade: Mídias Sociais CPBR10","slug":"Palco-Criatividade-Midias-Sociais-CPBR10"},{"name":"Palco Empreendedorismo CPBR10","slug":"Palco-Empreendedorismo-CPBR10"},{"name":"Palco Entretenimento CPBR10","slug":"Palco-Entretenimento-CPBR10"},{"name":"Palco Inovação CPBR10","slug":"Palco-Inovacao-CPBR10"},{"name":"Palco Principal CPBR10","slug":"Palco-Principal-CPBR10"},{"name":"Palco Segurança e Redes CPBR10","slug":"Palco-Seguranca-e-Redes-CPBR10"},{"name":"Palco Startup & Makers CPBR10","slug":"Palco-Startup-Makers-CPBR10"},{"name":"Workshop Ciência CPBR10","slug":"Workshop-Ciencia-CPBR10"},{"name":"Workshop Entretenimento CPBR10","slug":"Workshop-Entretenimento-CPBR10"},{"name":"Workshop Inovação CPBR10","slug":"Workshop-Inovacao-CPBR10"},{"name":"Workshop Software Livre CPBR10","slug":"Workshop-Software-Livre-CPBR10"},{"name":"Workshop Startup & Makers CPBR10","slug":"Workshop-Startup-Makers-CPBR10"}];
  }

  public changeProperty(filterName, filterValue): void {
    this.filtersService.setFilter(filterName, filterValue);
  }

  public clearDate(): void {
    this.changeProperty('date', undefined);
    this.iondate = undefined;
  }

  public clear(): void {
    this.filtersService.clear();
    this.iondate = undefined;
    this.stage = undefined;
  }

  ionViewDidLoad() {
    this.getStages();
    this.getFilters();
  }

}
