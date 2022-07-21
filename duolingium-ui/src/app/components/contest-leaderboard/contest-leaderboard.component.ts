import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

interface Contestant {
  userId: string,
  score: number
}

@Component({
  selector: 'app-contest-leaderboard',
  templateUrl: './contest-leaderboard.component.html',
  styleUrls: ['./contest-leaderboard.component.css']
})
export class ContestLeaderboardComponent implements OnInit {

  @Input() contestants: Contestant[] = [];
  @Input() user: string = '';
  @Input() answers: any = {};
  @Input() rankings: Array<any> = [];
  @Input() itemRankings: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contestants']) {
      this.contestants = changes['contestants'].currentValue;
    }
  }

}
