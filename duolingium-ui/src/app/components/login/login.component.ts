import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inputUsername: string = '';
  inputPassword: string = '';

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    console.log("Login button clicked")
    console.log("Logged in with credentials:")
    console.log("Username:", this.inputUsername)
    console.log("Password:", this.inputPassword)
    this.userService.checkLogin(this.inputUsername, this.inputPassword)
    .subscribe((out: any)=>{
      if (out.auth) {
        this.cookieService.set('userId', out.userId);
        window.location.href = '/learn';
      }
    });

  }

}