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
    const url = `${this.baseUrl}/${userId}/${languageId}`;
    return this.http.get(url);
  }

  getProgressModule(userId: string, languageId: string, moduleId: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/${languageId}/${moduleId}`;
    return this.http.get(url);
  }

  checkItem(userId: string, moduleId: string, itemId: string, type: string, answer: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/`
    interface body {
      moduleId: string,
      itemId: string,
      native?: string,
      english?: string
    }
    let putBody: body = {moduleId: moduleId, itemId: itemId};
    
    if (type == "native") putBody.native = answer;
    else putBody.english = answer;

    console.log("putting ", putBody)
    
    return this.http.put(url, putBody);
  }

}
