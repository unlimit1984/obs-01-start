import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';
import { of, Subject, Subscription, timer } from "rxjs";
import { reduce, scan, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;
  unsubscribe$ = new Subject<string>();
  subscr: Subscription;

  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });

    // const o = range(5, 10);
    // o.subscribe({
    //   next: (value: any) => console.log('next: ', value),
    //   complete: () => console.log('complete'),
    //   error: (error) => console.log('error: ', error)
    // });

    // const o = range(0, 100)
    //   .pipe(
    //     // выведем первое значение (last - последнее)
    //     last(value => value > 50)
    //   )
    //   .subscribe(value => console.log(value));

    // const o = interval(1000);
    // o.subscribe({
    //   next: (value: any) => console.log('next: ', value),
    //   complete: () => console.log('complete'),
    //   error: (error) => console.log('error: ', error)
    // });

    // const o = empty(); // сразу сделает complete
    // o.subscribe({
    //   next: (value: any) => console.log('next: ', value),
    //   complete: () => console.log('complete'),
    //   error: (error) => console.log('error: ', error)
    // });

    // Observable.create(observer => {
    //   let count = 0;
    //   setInterval(() => {
    //     console.log('MyTest:' + count);
    //     observer.next(count);
    //     if (count === 6) {
    //       observer.complete();
    //     }
    //     if (count > 9) {
    //       observer.error(new Error('Count is greater than 3!'));
    //     }
    //     count++;
    //   }, 1000);
    // }).subscribe(value => {
    //   console.log('started with ' + value);
    // }, exception => {
    //   console.log('err')
    // }, complete => {
    //   console.log('complete')
    // });

    // const op = from([4,5,6])
    //   .subscribe(value => console.log(value));

    // interval(100)
    //   .pipe(takeUntil(timer(5000)))
    //   .subscribe(value => console.log(value));

    // const timerOne = timer(0, 3000).pipe(
    //   take(3)
    // );
    // const timerTwo = timer(1000, 3000).pipe(
    //   take(3)
    // );
    // const timerThree = timer(2000, 3000).pipe(
    //   take(3)
    // );
    // const o = combineLatest(timerOne, timerTwo, timerThree).pipe(tap(x => console.log('tap: '+x)));
    // this.subscr = o.subscribe(value => console.log(value));

    // const arr = [1, 2, 3];
    // console.log(arr.reduce((previousValue, currentValue) => {
    //   console.log('previousValue=', previousValue, 'currentValue', currentValue);
    //   return previousValue + currentValue;
    // }));

    // let arr = [
    //   {
    //     payload: {
    //       doc: {
    //         id: 1,
    //         data: 'a'
    //       }
    //     }
    //   },
    //   {
    //     payload: {
    //       doc: {
    //         id: 2,
    //         data: 'b'
    //       }
    //     }
    //   },
    //   {
    //     payload: {
    //       doc: {
    //         id: 3,
    //         data: 'c'
    //       }
    //     }
    //   }
    // ];
    // let new_arr = arr.reduce((previousValue, currentValue) => {
    //   const id = currentValue.payload.doc.id;
    //   const data = currentValue.payload.doc.data;
    //   return {...previousValue, [id]: data};
    // }, {});
    //
    // console.log(arr);
    // console.log(new_arr);

    // const o = of(1, 2, 3)
    //   .pipe(
    //     reduce((previousValue, currentValue) => {
    //       console.log('previousValue=', previousValue, 'currentValue', currentValue);
    //       // получаем сумму всех значений
    //       return previousValue + currentValue;
    //     })
    //   );
    // this.subscr = o.subscribe(value => console.log(value));

    // const o = of(1, 2, 3)
    //   .pipe(
    //     scan((previousValue, currentValue) => {
    //       console.log('previousValue=', previousValue, 'currentValue', currentValue);
    //       // получаем сумму всех значений
    //       return previousValue + currentValue;
    //     })
    //   );
    // this.subscr = o.subscribe(value => console.log(value));

    const o = timer(0, 200)
      .pipe(
        throttleTime(1000)
      );
    this.subscr = o.subscribe(value => console.log(value));
  }

  onActivate() {
    // this.userService.activatedEmitter.emit(true);
    this.userService.activatedEmitter.next(true);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next("one");
    this.unsubscribe$.complete();

    this.subscr.unsubscribe();
  }

}
