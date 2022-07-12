import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private baseUrl = 'http://localhost:3000/api/tests'

  constructor(
    private http: HttpClient
  ) { }

  getAllTests(): Observable<any> {
    const url = `${this.baseUrl}/all`
    return this.http.get(url);
  }

  getAllTestsByModule(moduleId: string): Observable<any> {
    const url = `${this.baseUrl}/all/${moduleId}`;
    return this.http.get(url);
  }

  getTestResults(query: {languageId?: string, moduleId?: string, userId?: string, pageIndex: number}): Observable<any> {
    let url = `${this.baseUrl}?pageItems:25&pageIndex:${query.pageIndex}`;
    if (query.languageId) url = url + `&languageId=${query.languageId}`
    if (query.moduleId) url = url + `&moduleId=${query.moduleId}`
    if (query.userId) url = url + `&userId=${query.userId}`
    console.log("Query:", url)
    return this.http.get(url);
  }

  sendTestResults(languageId: string, 
                  englishName: string, 
                  nativeName: string, 
                  moduleId: string, 
                  displayName: string,
                  userId: string, 
                  total: number, 
                  correct: number, 
                  time: number, 
                  date: string): Observable<any> {
    const url = `${this.baseUrl}`
    let postBody = {
      languageId: languageId,
      englishName: englishName,
      nativeName: nativeName,
      moduleId: moduleId,
      displayName: displayName,
      userId: userId,
      total: total,
      correct: correct,
      time: time,
      date: date
    }
    return this.http.post(url, postBody)
  }
}
