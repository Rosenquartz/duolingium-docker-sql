import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-test-header',
  templateUrl: './test-header.component.html',
  styleUrls: ['./test-header.component.css']
})
export class TestHeaderComponent implements OnInit {

  interval!: ReturnType<typeof setInterval>;
  @Input() running: boolean = false;
  @Input() currentProgress: number = 0;
  @Input() currentScore: number = 0;
  @Output() time = new EventEmitter<number>;

  currentProgressString: string = '0%';
  timerMinutes: number = 0;
  timerSeconds: number = 0;
  timerMilli: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['running']) {
      this.running = changes['running'].currentValue;
      if (this.running) this.startTimer();
      else this.stopTimer();
    }
    if (changes['currentProgress']) {
      this.currentProgress = changes['currentProgress'].currentValue;
      this.currentProgressString = `${this.currentProgress}%`;
      console.log('Current Prrogress is', this.currentProgress)
    }
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
