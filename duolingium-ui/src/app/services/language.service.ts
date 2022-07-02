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

  getModuleItems(languageId: string, moduleId: string): Observable<any> {
    const url = `${this.baseUrl}/${languageId}/${moduleId}`
    return this.http.get(url);
  }

  getLanguages(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getLanguage(languageId: string): Observable<any> {
    const url = `${this.baseUrl}/${languageId}`;
    return this.http.get(url)
  }
  
}
