import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  createAccount(username: string, password: string, email: string, firstname: string, lastname: string): Observable<any> {
    const url = `${this.baseUrl}/create`
    return this.http.post(url, {
      username: username,
      password: password,
      email: email,
      firstname: firstname,
      lastname: lastname
    })
  }
  
  handleError(error: any) {
    return new Error(error);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getPreferredLanguage(userId: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/preferred`
    return this.http.get(url)
  }

  setPreferredLanguage(userId: string, languageId: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/preferred`
    return this.http.put(url, {
      userId: userId,
      preferredLanguage: languageId
  })
  }

}
