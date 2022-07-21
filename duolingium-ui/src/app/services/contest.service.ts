import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MultipleChoiceQuestion } from '../models/MultipleChoiceQuestion';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  userJoined = this.socket.fromEvent<any>('userJoined');
  startGame = this.socket.fromEvent<any>('startGame');
  loadItem = this.socket.fromEvent<any>('loadItem');
  contestantAnswered = this.socket.fromEvent<any>('contestantAnswered');
  startPettyTimer = this.socket.fromEvent<any>('startPettyTimer');
  startTimer = this.socket.fromEvent<any>('startTimer');
  timerUpdate = this.socket.fromEvent<any>('timerUpdate');
  showRankings = this.socket.fromEvent<any>('userShowRankings');
  hideRankings = this.socket.fromEvent<any>('userHideRankings');
  showFinalRankings = this.socket.fromEvent<any>('showFinalRankings');
  updateCurrentNumber = this.socket.fromEvent<any>('updateCurrentItem');

  private baseUrl = 'http://localhost:3000/api/contests'

  constructor(
    private socket: Socket,
    private http: HttpClient
  ) { }

  createLobby(languageId: string, moduleId: string, timer: number): Observable<any> {
    let url = `${this.baseUrl}/create`;
    let request = {
      languageId: languageId,
      moduleId: moduleId,
      timer: timer
    }
    return this.http.post(url, request)
  }

  checkLobby(contestId: string): Observable<any> {
    let url = `${this.baseUrl}/check?contestId=${contestId}`;
    return this.http.get(url)
  }

  joinLobby(contestId: string, userId: string): Observable<any> {
    let url = `${this.baseUrl}/join`;
    let request = {
      contestId: contestId,
      userId: userId
    }
    return this.http.post(url, request)
  }

  getContestants(contestId: string): Observable<any> {
    /*Not working*/
    let url = `${this.baseUrl}/join`;
    return this.http.get(url);
  }

  getItemRanking(contestItemId: string): Observable<any> {
    let url = `${this.baseUrl}/rankings?contestItemId=${contestItemId}`;
    return this.http.get(url)
  }

  getRankings(contestId: string): Observable<any> {
    let url = `${this.baseUrl}/rankings?contestId=${contestId}`;
    return this.http.get(url);
  }

  startItem(contestId: string, moduleId: string, itemId: string): Observable<any> {
    let url = `${this.baseUrl}/startItem`;
    let request = {
      contestId: contestId,
      moduleId: moduleId,
      itemId: itemId
    }
    return this.http.post(url, request);
  }

  answerItem(contestItemId: string, contestId: string, userId: string, moduleId: string, itemId: string, type: string, answer: string): Observable<any> {
    let url = `${this.baseUrl}/answerItem`;
    interface Request {
      contestItemId: string,
      contestId: string,
      userId: string,
      moduleId: string,
      itemId: string,
      english?: string,
      native?: string
    }
    let request: Request = {
      contestItemId: contestItemId,
      contestId: contestId,
      userId: userId,
      moduleId: moduleId,
      itemId: itemId
    }
    if (type == 'english') request['english'] = answer;
    else if (type == 'native') request['native'] = answer;
    return this.http.post(url, request);
  }

  /* Event emitters */

  emitJoinAsConductor(contestId: string): void {
    this.socket.emit('joinAsConductor', {contestId: contestId});
  }

  emitJoinAsContestant(contestId: string, users: string[]): void {
    this.socket.emit('joinAsContestant', {contestId: contestId, users: users});
  }  

  emitStartGame(contestId: string): void {
    this.socket.emit('startGame', {contestId: contestId});
  }

  emitNextItem(contestId: string, contestItemId: string, currentItem: number, totalItems: number, question: MultipleChoiceQuestion): void {
    this.socket.emit('nextItem', {contestId: contestId, contestItemId: contestItemId, currentItem: currentItem, totalItems: totalItems, question: question});
  }

  emitContestantAnswer(contestId: string, userId: string, answer: string): void {
    this.socket.emit('contestantAnswer', {contestId: contestId, userId: userId, answer: answer})
  }

  emitStartPettyTimer(contestId: string, timer: number): void {
    this.socket.emit('startPettyTimer', {contestId: contestId, timer: timer})
  }

  emitStartTimer(contestId: string, timer: number): void {
    this.socket.emit('startTimer', {contestId: contestId, timer: timer})
  }

  emitPettyTimerUpdate(contestId: string, timer: number): void {
    this.socket.emit('pettyTimerUpdate', {contestId: contestId, timer: timer})
  }

  emitTimerUpdate(contestId: string, timer: number): void {
    this.socket.emit('timerUpdate', {contestId: contestId, timer: timer})
  }

  emitShowRankings(contestId: string, rankings: any, itemRankings: any, contestantAnswers: any): void {
    this.socket.emit('showRankings', {contestId: contestId, rankings: rankings, itemRankings: itemRankings, contestantAnswers: contestantAnswers})
  }

  emitHideRankings(contestId: string): void {
    this.socket.emit('hideRankings', {contestId: contestId})
  }

  emitFinalRankings(contestId: string, rankings: any): void {
    this.socket.emit('showFinalRankings', {contestId: contestId, rankings: rankings})    
  }

  emitUpdateCurrentNumber(contestId: string, currentItem: number): void {
    this.socket.emit('updateCurrentItem', {contestId: contestId, currentItem: currentItem})
  }
}
