import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.checkSignedIn();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
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

  signUp() {
    console.log('signup button clicked')
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

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  resetPassword(){
    this.router.navigateByUrl('reset-password');
  }
}
