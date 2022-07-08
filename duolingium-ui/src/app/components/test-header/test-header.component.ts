import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-test-header',
  templateUrl: './test-header.component.html',
  styleUrls: ['./test-header.component.css']
})
export class TestHeaderComponent implements OnInit {

  interval!: ReturnType<typeof setInterval>;
  @Input() running: boolean = false;
  @Output() time = new EventEmitter<number>;

  timerMinutes: number = 0;
  timerSeconds: number = 0;
  timerMilli: number = 0;

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
    this.timerMilli += 1
    if (this.timerMilli >= 10) {
      this.timerMilli -= 10;
      this.timerSeconds += 1;
    }
    if (this.timerSeconds >= 60) {
      this.timerSeconds -= 60;
      this.timerMinutes += 1;
    }
  }

  getTime(): number {
    return this.timerMinutes*600 + this.timerSeconds*10 + this.timerMilli
  }

}
