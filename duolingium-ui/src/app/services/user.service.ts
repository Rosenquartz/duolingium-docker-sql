import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/api/users'

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  checkLogin(username: string, password: string): Observable<any> {
    const url = this.baseUrl + '/login'
    console.log("sending post")
    return this.http.post(url, {userId: username, password: password});
  }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getPreferredLanguage(userId: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/preferred`
    return this.http.get(url)
  }
}
