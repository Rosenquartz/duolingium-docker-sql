import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ContestService } from 'src/app/services/contest.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contest-lobby',
  templateUrl: './contest-lobby.component.html',
  styleUrls: ['./contest-lobby.component.css']
})
export class ContestLobbyComponent implements OnInit {

  state: string = 'selectionScreen';
  users: Array<any> = [];
  contestId: string = '';
  inputContestId: string = '';

  _userJoinedSub!: Subscription;
  _startGameSub!: Subscription;

  constructor(
    private contestService: ContestService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this._userJoinedSub = this.contestService.userJoined
    .subscribe(out=>{this.users = out; console.log("Output from user joined subscription", out)})

    this._startGameSub = this.contestService.startGame
    .subscribe(out=>{
      this._userJoinedSub.unsubscribe();
      console.log("Starting game!")
      this.startGameAsContestant();
    })
    
  }

  createLobby(): void {
    this.contestService.createLobby("kr", "947f1764", 30)
    .subscribe(out=>{
      this.contestId = out.contestId;
      this.state = 'lobbyConductor';
      this.contestService.emitJoinAsConductor(this.contestId);
    })
  }

  joinLobby(): void {
    if (!this.inputContestId) return;
    let userId = this.cookieService.get('userId');
    this.contestService.joinLobby(this.inputContestId, userId)
    .subscribe(out=>{
      this.contestId = out.contestId;
      this.users = out.users
      this.state = "standby";
      this.contestService.emitJoinAsContestant(this.contestId, this.users)
    })
  }

  /* Conductor functions */
  startGameAsConductor(): void {
    console.log("Emitting startGame as conductor")
    this.contestService.emitStartGame(this.contestId);
    this.state = "conducting"
  }

  /* Contestant functions */
  startGameAsContestant(): void {
    console.log("Starting game as contestant")
    this.state = "ongoing"
  }

}
