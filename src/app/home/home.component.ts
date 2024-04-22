import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, filter, interval, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor() {}

  ngOnInit() {
    // this.subscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 6) {
          //zamien na 2
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.subscription = customIntervalObservable
      .pipe(
        filter((data: number) => {
          return data > 0;
        }),
        map((data: number) => 'Round: ' + (data + 1))
      ) // tutaj dodajemy 1
      .subscribe({
        next: (data) => console.log(data),
        error: (error) => alert(error.message),
        complete: () => console.log('Completed!'),
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
