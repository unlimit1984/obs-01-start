import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    // This is the implementation of above interval function
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 6) {
          observer.complete();
        }
        if (count > 9) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    // customIntervalObservable.pipe(map((data: number) => {
    //   return 'Round: ' + (data + 1);
    // }));
    // this.firstObsSubscription = customIntervalObservable.subscribe(data => {
    this.firstObsSubscription = customIntervalObservable.pipe(
      filter(data => {
        return data > 0;
      }),
      map((data: number) => {
        return 'Round: ' + (data + 1);
      })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
