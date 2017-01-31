import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Stagename pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'stagename'
})
@Injectable()
export class Stagename {
  /*
    Takes a value and makes it lowercase.
   */
  transform(stage: string) {
    if (stage && stage.indexOf) {
      let idx = stage.indexOf('CPBR10');
      return stage.substring(idx, 0);
    }
    return stage;
  }
}
