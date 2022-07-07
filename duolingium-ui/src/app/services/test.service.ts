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

  getAllTestsByModule(moduleId: string): Observable<any> {
    const url = `${this.baseUrl}/all/${moduleId}`;
    return this.http.get(url);
  }

}
