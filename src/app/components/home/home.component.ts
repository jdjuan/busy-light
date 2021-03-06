import { Component, OnInit } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  current = 0;
  max = 180;
  remainingTime = '';
  minutesSet = 3;
  inProgress = true;
  interval$: Observable<number>;

  constructor() {
    this.interval$ = interval(1000).pipe(
      filter(() => this.inProgress),
      tap(() => {
        this.current += 1;
        this.updateProgress();
        this.updateRemainingTime();
      }),
    );
    this.interval$.subscribe();
  }

  updateProgress() {
    this.inProgress = this.max > this.current;
  }

  updateRemainingTime() {
    const secondsLeft = this.max - Math.round(this.current);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    if (!seconds) {
      this.remainingTime = `00`;
    } else {
      this.remainingTime = `${seconds}`;
    }
    if (minutes) {
      this.remainingTime = `${minutes}:${this.remainingTime}`;
    }
  }

  setTimer(input: HTMLInputElement) {
    this.max = +input.value * 60;
    this.minutesSet = +input.value;
    input.value = null;
    this.current = 0;
    this.updateProgress();
  }
  restart() {
    this.current = 0;
  }

  ngOnInit() {}
}
