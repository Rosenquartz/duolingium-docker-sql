import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-score-screen',
  templateUrl: './score-screen.component.html',
  styleUrls: ['./score-screen.component.css']
})
export class ScoreScreenComponent implements OnInit {

  @Input() correctAnswers!: number;
  @Input() total!: number;
  @Input() time!: number;
  @Input() englishName!: string;

  userId: string= '';
  scoreString: string = '';
  imgUrl=''

  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    console.log(Number(this.correctAnswers / this.total));
    this.scoreString = `${Number(this.correctAnswers / this.total)*100}%`
    if (Number(this.correctAnswers / this.total)*100 == 100) {
      console.log("one hundo")
      this.imgUrl = "https://design.duolingo.com/266788168c5f135b35e3.svg"
    } else if (Number(this.correctAnswers / this.total)*100 >= 75) {
      console.log("greater than 75")
      this.imgUrl = "https://design.duolingo.com/3aeb9f981f17977278cf.svg"
    } else if (Number(this.correctAnswers / this.total)*100 >= 50) {
      console.log("greater than 50")
      this.imgUrl = "https://design.duolingo.com/f982c877f0b8c2be1dfa.svg"
    } else if (Number(this.correctAnswers / this.total)*100 >= 25) {
      console.log("greater than 25")
      this.imgUrl = "https://design.duolingo.com/ad9ec13f2b161e008ab1.svg"
    } else {
      console.log("less than 25")
      this.imgUrl = "https://design.duolingo.com/f77ecc35cfcf99632275.svg"
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['englishName']) {
      this.englishName = changes['englishName'].currentValue;
    }
  }
}
