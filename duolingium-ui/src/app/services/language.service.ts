import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private baseUrl = 'http://localhost:3000/api/languages/kr'

  constructor(
    private http: HttpClient
  ) { }

  getModuleItems(moduleId: string): Observable<any> {
    const url = `${this.baseUrl}/${moduleId}`
    return this.http.get(url);
  }
  
}
