import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the OrderByDate pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'orderByDate'
})
@Injectable()
export class OrderByDate {
  /*
    Takes a value and makes it lowercase.
   */
  transform(talks) {
    if (talks && talks.sort && talks.length > 0) {
      return talks.sort((t1, t2) => {
        let d1 = new Date(t1.date);
        let d2 = new Date(t2.date);
        return d1.getTime() - d2.getTime();
      });
    }
    return talks;
  }
}
