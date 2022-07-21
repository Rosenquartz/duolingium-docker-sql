import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-contest-header',
  templateUrl: './contest-header.component.html',
  styleUrls: ['./contest-header.component.css']
})
export class ContestHeaderComponent implements OnInit {

  @Input() currentItem!: number;
  @Input() totalItems!: number;
  @Input() currentTimer!: number;
  @Input() totalTimer!: number;
  
  timerProgress: string = '100%';
  timerProgressBar: number = 100;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentItem']) this.currentItem = changes['currentItem'].currentValue;
    if (changes['currentTimer']) {
      this.currentTimer = changes['currentTimer'].currentValue;
      console.log("currenttimer is", this.currentTimer);
      this.timerProgressBar = Math.round(this.currentTimer * 100 / this.totalTimer)
      this.timerProgress = `${this.timerProgressBar}%`;
    }
    if (changes['totalTimer']) {
      this.currentTimer = this.totalTimer;
      this.totalTimer = changes['totalTimer'].currentValue;
      console.log("totalTimer is", this.totalTimer)
      this.timerProgressBar = 100;
      this.timerProgress = '100%';
    }
  }

}
