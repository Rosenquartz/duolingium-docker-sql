import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  userJoined = this.socket.fromEvent<any>('userJoined');
  startGame = this.socket.fromEvent<any>('startGame');
  loadItem = this.socket.fromEvent<any>('loadItem');

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

  emitJoinAsConductor(contestId: string): void {
    this.socket.emit('joinAsConductor', {contestId: contestId});
  }

  emitJoinAsContestant(contestId: string, users: string[]): void {
    this.socket.emit('joinAsContestant', {contestId: contestId, users: users});
  }  

  emitStartGame(contestId: string): void {
    this.socket.emit('startGame', {contestId: contestId});
  }
}
