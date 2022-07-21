import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

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
  @Input() showingFinalRankings: boolean = false;

  userId: string = '';

  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    for (let i = 0; i < this.rankings.length; i++) {
      this.rankings[i]['rank'] = i+1
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contestants']) {
      this.contestants = changes['contestants'].currentValue;
    }
    if (changes['showingFinalRankings']) {
      this.showingFinalRankings = changes['showingFinalRankings'].currentValue;
    }
  }

}
