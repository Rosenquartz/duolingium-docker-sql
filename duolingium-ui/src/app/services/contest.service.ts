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
  pettyTimer = this.socket.fromEvent<any>('pettyTimer');
  timer = this.socket.fromEvent<any>('timer');

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

  emitNextItem(contestId: string, question: MultipleChoiceQuestion): void {
    this.socket.emit('nextItem', {contestId: contestId, question: question});
  }

  emitContestantAnswer(contestId: string, userId: string, answer: string): void {
    this.socket.emit('contestantAnswer', {contestId: contestId, userId: userId, answer: answer})
  }

  emitPettyTimerUpdate(contestId: string, timer: number): void {
    this.socket.emit('pettyTimerUpdate', {contestId: contestId, timer: timer})
  }

  emitTimerUpdate(contestId: string, timer: number): void {
    this.socket.emit('timerUpdate', {contestId: contestId, timer: timer})
  }

  emitShowRankings(contestId: string): void {
    this.socket.emit('showRankings', {contestId: contestId})
  }
}
