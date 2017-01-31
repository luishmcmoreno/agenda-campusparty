import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Filter pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'filterTalks',
  pure: false
})
@Injectable()
export class FilterTalks {
  /*
    Takes a value and makes it lowercase.
   */
  transform(talks, filters) {
    if (!talks || !filters) {
      return talks;
    }
    let newTalks = [];
    for (let t in talks) {
      let talk = talks[t];
      if (filters.stage) {
        if (talk.stage_slug === filters.stage) {
        } else {
          continue;
        }
      }
      if (filters.date) {
        let date = '';
        date +=  '0' + filters.date.month.value;
        date += '-' + filters.date.day.text;
        if (talk.date.indexOf(date) !== -1) {
        } else {
          continue;
        }
      }
      newTalks.push(talk);
    }
    return newTalks;
  }
}
