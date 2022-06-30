import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private baseUrl = 'http://localhost:3000/api/progress'

  constructor(
    private http: HttpClient
  ) { }

  getProgressModules(userId: string, languageId: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/${languageId}`
    return this.http.get(url);
  }

}
