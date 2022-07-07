import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  interval!: ReturnType<typeof setInterval>;
  @Input() running: boolean = false;
  @Output() time = new EventEmitter<number>;
  
  minutes: number = 0;
  seconds: number = 0;
  milli: number = 0;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.running = changes['running'].currentValue;
    if (this.running) this.startTimer();
    else this.stopTimer();
  }

  startTimer(): void {    
    this.interval = setInterval(() => {
      this.updateClock()
    },90)
  }

  stopTimer(): void {
    clearInterval(this.interval)
    this.time.emit(this.getTime());
  }

  updateClock(): void {
    this.milli += 1
    if (this.milli >= 10) {
      this.milli -= 10;
      this.seconds += 1;
    }
    if (this.seconds >= 60) {
      this.seconds -= 60;
      this.minutes += 1;
    }
  }

  getTime(): number {
    return this.minutes*600 + this.seconds*10 + this.milli
  }

}
