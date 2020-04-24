import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.checkSignedIn();
  }
  checkSignedIn() {
    this.userService.userDataSubject.subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('tabs');
      }
    });
    
  }

  signIn(email, password) {
    this.userService.signInEmail(email.value, password.value).then(
      (res) => {
        this.router.navigateByUrl('tabs');
      },
      (err) => {
        //TODO make normal error message
        window.alert(err.message);
      }
    );
  }

  signUp(email, password) {
    this.router.navigateByUrl('signup');
  }

  authGoogle() {
    this.userService.googleAuth().then(
      (res) => {
        this.router.navigateByUrl('tabs');
      },
      (err) => {
        //TODO make normal error message
        window.alert(err.message);
      }
    );
  }
}
