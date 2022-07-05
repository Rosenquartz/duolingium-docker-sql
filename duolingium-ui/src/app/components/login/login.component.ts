import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  createNew: number = 0;

  inputUsername: string = '';
  inputPassword: string = '';

  inputFirstName: string = '';
  inputLastName: string = '';
  inputEmail: string = '';

  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.errorMessage = ''
    this.userService.checkLogin(this.inputUsername, this.inputPassword)
    .subscribe(out=>{
      if (out.auth) {
        console.log("setting user to", out.userId, " language to", out.languageId)
        this.cookieService.set('userId', out.userId);
        this.cookieService.set('languageId', out.languageId);
        window.location.href = '/learn';
      } else {
        this.errorMessage = "Incorrect username/password"
      }
    });
  }

  createAccount(): void {
    this.errorMessage = '';
    this.userService.createAccount(this.inputUsername, this.inputPassword, this.inputEmail, this.inputFirstName, this.inputLastName)
    .subscribe({next: ()=>{
      this.cookieService.set('userId', this.inputUsername);
      window.location.href='/languages'
    }, error: (error)=>{
      this.errorMessage=error.error_message
    }})
    /*.subscribe(out=>{
      this.cookieService.set('userId', this.inputUsername);
      window.location.href = '/languages';
      console.log(out);
      return out;
    }, (error)=>{
      this.errorMessage = error.error.error_message;
    })*/
  }

  setError(): void {

  }

  switchToCreateNew(): void {
    this.errorMessage = '';
    this.createNew = 1;
  }

  switchToLogIn(): void {
    this.errorMessage = '';
    this.createNew = 0;
  }

}
