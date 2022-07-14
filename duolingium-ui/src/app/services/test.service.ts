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
    const url = `${this.baseUrl}/history?pageItems=25`
    return this.http.get(url);
  }

  loadTest(pageDelta: number, previousKey: string, nextKey: string): Observable<any> {
    console.log(previousKey, nextKey)
    if (pageDelta < 0) {
      const url = `${this.baseUrl}/history?pageItems=25&pageDelta=${-pageDelta-1}&previousKey=${previousKey}`;
      return this.http.get(url)
    } else {
      const url = `${this.baseUrl}/history?pageItems=25&pageDelta=${pageDelta-1}&nextKey=${nextKey}`;
      return this.http.get(url)
    }
  }

  initialFilter(query: {languageId?: string, moduleId?: string, userId?: string}): Observable<any> {
    let url = `${this.baseUrl}/history?pageItems=25`;
    if (query.languageId) url += `&languageId=${query.languageId}`;
    if (query.moduleId) url += `&moduleId=${query.moduleId}`;
    if (query.userId) url += `&userId=${query.userId}`;
    console.log("Initial filter for", url)
    return this.http.get(url);
  }

  reloadFilter(query: {languageId?: string, moduleId?: string, userId?: string}, pageDelta: number, previousKey: string, nextKey: string): Observable<any>{
    let url = `${this.baseUrl}/history?pageItems=25`;
    if (query.languageId) url += `&languageId=${query.languageId}`;
    if (query.moduleId) url += `&moduleId=${query.moduleId}`;
    if (query.userId) url += `&userId=${query.userId}`;

    if (pageDelta < 0) {
      url += `&pageDelta=${-pageDelta-1}&previousKey=${previousKey}`;
    } else {
      url += `&pageDelta=${pageDelta-1}&nextKey=${nextKey}`;
    }
    console.log("Reloading filter", query, url)
    return this.http.get(url)
  }

  /* OLD FUNCTIONS */

  getAllTestsByModule(moduleId: string): Observable<any> {
    const url = `${this.baseUrl}/all/${moduleId}`;
    return this.http.get(url);
  }

  getTestResults(query: {languageId?: string, moduleId?: string, userId?: string, pageIndex: number}): Observable<any> {
    let url;
    if (!query.languageId && !query.moduleId && !query.userId) {
      url = `${this.baseUrl}/all?pageItems=25&pageIndex=${query.pageIndex}`;
    } else {
      url = `${this.baseUrl}/filter?pageItems=25&pageIndex=${query.pageIndex}`;
      if (query.languageId) url = url + `&languageId=${query.languageId}`
      if (query.moduleId) url = url + `&moduleId=${query.moduleId}`
      if (query.userId) url = url + `&userId=${query.userId}`
    }
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
