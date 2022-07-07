import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private baseUrl = 'http://localhost:3000/api/languages'

  constructor(
    private http: HttpClient
  ) { }

  getLanguageList(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getLanguageInfo(languageId: string): Observable<any> {
    const url = `${this.baseUrl}/info/${languageId}`
    return this.http.get(url);
  }

  getModuleList(languageId: string): Observable<any> {
    const url = `${this.baseUrl}/list/${languageId}`;
    return this.http.get(url)
  }

  getModuleInfo(languageId: string, moduleId: string): Observable<any> {
    console.log("getting module info")
    const url = `${this.baseUrl}/info/${languageId}/${moduleId}`;
    return this.http.get(url);
  }

  getModuleItems(languageId: string, moduleId: string): Observable<any> {
    const url = `${this.baseUrl}/list/${languageId}/${moduleId}`
    return this.http.get(url);
  }
  
}
